import {
  FaceLandmarker,
  FilesetResolver
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14";

const video = document.getElementById("webcam");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const statusText = document.getElementById("status");
const earText = document.getElementById("earValue");
const message = document.getElementById("message");
const cameraMessage = document.getElementById("cameraMessage");

let faceLandmarker = null;
let cameraStream = null;
let running = false;
let frameCount = 0;
let alertPlaying = false;
let lastVideoTime = -1;

const EAR_THRESHOLD = 0.25;
const CONSEC_FRAMES = 20;

function distance(a, b) {
  const dx = (a.x - b.x) * video.videoWidth;
  const dy = (a.y - b.y) * video.videoHeight;
  return Math.sqrt(dx * dx + dy * dy);
}

function calculateEAR(eye) {
  const vertical1 = distance(eye[1], eye[5]);
  const vertical2 = distance(eye[2], eye[4]);
  const horizontal = distance(eye[0], eye[3]);

  return (vertical1 + vertical2) / (2 * horizontal);
}

function speakAlert() {
  if (alertPlaying) return;

  alertPlaying = true;

  if ("speechSynthesis" in window) {
    const speech = new SpeechSynthesisUtterance(
      "Alert! Wake up! Please be careful."
    );

    speech.onend = () => {
      alertPlaying = false;
    };

    speech.onerror = () => {
      alertPlaying = false;
    };

    window.speechSynthesis.speak(speech);
  } else {
    alertPlaying = false;
  }
}

async function loadModel() {
  message.textContent = "Loading AI model... Please wait.";

  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
  );

  faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
      delegate: "CPU"
    },
    runningMode: "VIDEO",
    numFaces: 1
  });
}

function detectFrame() {
  if (!running || video.readyState < 2) {
    if (running) requestAnimationFrame(detectFrame);
    return;
  }

  if (video.currentTime !== lastVideoTime) {
    lastVideoTime = video.currentTime;

    const results = faceLandmarker.detectForVideo(
      video,
      performance.now()
    );

    if (results.faceLandmarks.length > 0) {
      const landmarks = results.faceLandmarks[0];

      const rightEye = [33, 160, 158, 133, 153, 144]
        .map(index => landmarks[index]);

      const leftEye = [362, 385, 387, 263, 373, 380]
        .map(index => landmarks[index]);

      const leftEAR = calculateEAR(leftEye);
      const rightEAR = calculateEAR(rightEye);
      const ear = (leftEAR + rightEAR) / 2;

      earText.textContent = `EAR: ${ear.toFixed(2)}`;
      cameraMessage.style.display = "none";

      if (ear < EAR_THRESHOLD) {
        frameCount++;

        if (frameCount >= CONSEC_FRAMES) {
          statusText.textContent = "DROWSINESS ALERT!";
          statusText.style.color = "#ef4444";
          message.textContent = "Eyes closed! Please stay alert.";
          speakAlert();
        } else {
          statusText.textContent = "Eyes Closing...";
          statusText.style.color = "#facc15";
          message.textContent = "Monitoring eye movement...";
        }
      } else {
        frameCount = 0;
        alertPlaying = false;

        if ("speechSynthesis" in window) {
          window.speechSynthesis.cancel();
        }

        statusText.textContent = "ACTIVE - AWAKE";
        statusText.style.color = "#22c55e";
        message.textContent = "Driver is awake. Monitoring...";
      }
    } else {
      frameCount = 0;
      earText.textContent = "EAR: --";
      statusText.textContent = "Face Not Detected";
      statusText.style.color = "#facc15";
      message.textContent = "Please keep your face visible to the camera.";
    }
  }

  if (running) {
    requestAnimationFrame(detectFrame);
  }
}

startBtn.addEventListener("click", async () => {
  try {
    startBtn.disabled = true;
    message.textContent = "Starting camera...";

    if (!faceLandmarker) {
      await loadModel();
    }

    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: 640,
        height: 480
      },
      audio: false
    });

    video.srcObject = cameraStream;
    await video.play();

    running = true;
    frameCount = 0;
    lastVideoTime = -1;

    cameraMessage.style.display = "none";
    statusText.textContent = "Monitoring...";
    statusText.style.color = "#38bdf8";
    message.textContent = "AI monitoring started.";

    detectFrame();
  } catch (error) {
    console.error(error);
    message.textContent =
      "Error: " + error.message +
      ". Check camera permission and internet connection.";
    startBtn.disabled = false;
  }
});

stopBtn.addEventListener("click", () => {
  running = false;

  if (cameraStream) {
    cameraStream.getTracks().forEach(track => track.stop());
    cameraStream = null;
  }

  video.srcObject = null;

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  frameCount = 0;
  alertPlaying = false;
  startBtn.disabled = false;

  cameraMessage.style.display = "block";
  statusText.textContent = "Not Started";
  statusText.style.color = "#facc15";
  earText.textContent = "EAR: --";
  message.textContent = "Camera stopped.";
});
