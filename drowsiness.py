import cv2
import dlib
import time
from scipy.spatial import distance
from imutils import face_utils
import pyttsx3


def eye_aspect_ratio(eye):
    A = distance.euclidean(eye[1], eye[5])  # vertical
    B = distance.euclidean(eye[2], eye[4])  # vertical
    C = distance.euclidean(eye[0], eye[3])  # horizontal
    ear = (A + B) / (2.0 * C)
    return ear

engine = pyttsx3.init()

# Alert flag
alert_playing = False


def sound_alert():
    global alert_playing
    if not alert_playing:
        alert_playing = True
        engine.say("Alert! Wake up!")
        engine.runAndWait()
        alert_playing = False


EAR_THRESHOLD = 0.25
CONSEC_FRAMES = 20
frame_count = 0

# Load models
print("[INFO] Loading facial landmark predictor...")
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")


(lStart, lEnd) = face_utils.FACIAL_LANDMARKS_IDXS["left_eye"]
(rStart, rEnd) = face_utils.FACIAL_LANDMARKS_IDXS["right_eye"]

# Start webcam
cap = cv2.VideoCapture(0)
print("[INFO] Starting video stream...")

while True:
    ret, frame = cap.read()
    if not ret:
        break

    frame = cv2.resize(frame, (640, 480))
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    rects = detector(gray, 0)

    for rect in rects:
        shape = predictor(gray, rect)
        shape = face_utils.shape_to_np(shape)

        # Get eye coordinates
        leftEye = shape[lStart:lEnd]
        rightEye = shape[rStart:rEnd]

        # Compute EAR
        leftEAR = eye_aspect_ratio(leftEye)
        rightEAR = eye_aspect_ratio(rightEye)
        ear = (leftEAR + rightEAR) / 2.0

        # Visualize eyes
        leftHull = cv2.convexHull(leftEye)
        rightHull = cv2.convexHull(rightEye)
        cv2.drawContours(frame, [leftHull], -1, (0, 255, 0), 1)
        cv2.drawContours(frame, [rightHull], -1, (0, 255, 0), 1)

        # Check EAR threshold
        if ear < EAR_THRESHOLD:
            frame_count += 1
            if frame_count >= CONSEC_FRAMES and not alert_playing:
                cv2.putText(frame, "ALERT!", (20, 30),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
                sound_alert()
        else:
            frame_count = 0
            alert_playing = False  

        # Show EAR value
        cv2.putText(frame, f"EAR: {ear:.2f}", (500, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 0), 2)

    cv2.imshow("Drowsiness Detection", frame)

    key = cv2.waitKey(1)
    if key == 27:  
        break

cap.release()
cv2.destroyAllWindows()
