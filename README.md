# Driver Drowsiness Detection System

A real-time AI-based Driver Drowsiness Detection System developed using Python, Computer Vision, and Machine Learning. The system continuously monitors the driver's eyes through a webcam and detects signs of drowsiness. When drowsiness is detected, an alert sound is triggered to help prevent accidents and improve road safety.

## Features

- Real-time face and eye monitoring using webcam
- Eye blink detection using Eye Aspect Ratio (EAR)
- Drowsiness detection using facial landmarks
- Audio alert when drowsiness is detected
- Live camera feed support
- User-friendly interface
- Helps improve road safety

## Technologies Used

- Python
- OpenCV
- dlib
- imutils
- scipy
- playsound
- pyttsx3
- Tkinter

## Installation

### Clone the Repository

```bash
git clone https://github.com/LAVANYAPATHLAVATH/drowsiness-project.git
cd drowsiness-project
```

### Create Virtual Environment

```bash
python -m venv myenv
```

### Activate Virtual Environment

#### Windows

```bash
myenv\Scripts\activate
```

#### Linux / Mac

```bash
source myenv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run the Project

```bash
python app.py
```

## How It Works

1. Captures live video from the webcam.
2. Detects the driver's face and eyes.
3. Calculates Eye Aspect Ratio (EAR).
4. Monitors eye closure duration.
5. Detects drowsiness when eyes remain closed for a specified time.
6. Triggers an audio alert to wake the driver.

## Applications

- Driver Monitoring Systems
- Smart Vehicle Safety Systems
- Transportation Safety Solutions
- Fleet Management Systems

## Project Outcome

This project demonstrates the practical application of Artificial Intelligence and Computer Vision in enhancing road safety by detecting driver fatigue in real time and providing immediate alerts.

## Author

**Pathlavath Lavanya**

- GitHub: https://github.com/LAVANYAPATHLAVATH
- LinkedIn: https://www.linkedin.com/in/pathlavath-lavanya

## Live Demo

https://drowsiness-project.vercel.app
