# Drowsiness Detection Project

This project detects driver drowsiness in real-time using Python and a webcam.

## Features
- Real-time video monitoring
- Eye blink detection
- Audio alert when drowsiness is detected
- GUI support with live camera feed

## Libraries Used
- OpenCV
- dlib
- imutils
- playsound
- pyttsx3
- scipy

## Setup Instructions

1. **Clone the repository:**
   ```bash
## Create a virtual environment:
cd ~/Desktop/drowsiness_project

# Create README.md with full content
cat > README.md << EOL
# Drowsiness Detection Project

This project detects driver drowsiness in real-time using Python and a webcam.

---

## Features
- Real-time video monitoring using webcam
- Eye blink detection
- Audio alert when drowsiness is detected
- GUI support with live camera feed

---

## Libraries Used
- OpenCV
- dlib
- imutils
- playsound
- pyttsx3
- scipy

---

## Setup Instructions

1. **Clone the repository:**
\`\`\`bash
git clone https://github.com/lavanyapathlavath/drowsiness_project.git
cd drowsiness_project
\`\`\`

2. **Create a virtual environment:**
\`\`\`bash
python3 -m venv drowsy_venv
\`\`\`

3. **Activate the virtual environment:**
- **Linux/macOS:**
\`\`\`bash
source drowsy_venv/bin/activate
\`\`\`
- **Windows PowerShell:**
\`\`\`bash
.\drowsy_venv\Scripts\Activate.ps1
\`\`\`

4. **Install required libraries:**
\`\`\`bash
pip install -r requirements.txt
\`\`\`

> If \`requirements.txt\` does not exist, install manually:  
\`\`\`bash
pip install opencv-python dlib imutils playsound pyttsx3 scipy
\`\`\`

5. **Run the project:**
\`\`\`bash
python drowsiness_project.py
\`\`\`

---

## How It Works
- Uses **dlib** to detect facial landmarks
- Detects **eye aspect ratio (EAR)** to track eye blinks
- Plays an **audio alert** if eyes remain closed too long

---

## Notes
- Make sure your **webcam is connected**
- If you see **Qt font warnings**, you can ignore them or install **dejavu fonts**:
\`\`\`bash
sudo apt install fonts-dejavu
\`\`\`

---

## Screenshots
![Screenshot](Drowsiness Detection_screenshot_05.08.2025.png)

---

## Author
Lavanya Pathlavath  
[GitHub Profile](https://github.com/lavanyapathlavath)
EOL

# Stage README.md
git add README.md

# Commit changes
git commit -m "Add full project README"

# Push to GitHub (replace <YOUR_PAT> with your personal access token)
git push https://lavanyapathlavath:<YOUR_PAT>@github.com/lavanyapathlavath/drowsiness_project.git main
