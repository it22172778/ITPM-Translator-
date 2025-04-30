# NEXTGEN - 🇱🇰 Sinhala ↔ English Translator

> **NEXTGEN – Sinhala English Translator** is an intelligent MERN stack web application that allows users to translate text between Sinhala and English, extract text from images, convert speech to text, and enhance language learning with quizzes, bookmarks, and personal notes.

A full-featured text translation web application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js) that supports:
- 🔤 Sinhala ↔ English text translation
- 🖼️ Image to text recognition (OCR)
- 🎙️ Voice to text input
- 🧠 Vocabulary quiz generator
- 📌 Bookmarking system
- 📝 Personal notes section

---

## 🚀 Features

### 🌐 Text Translation
- Translate between Sinhala and English in real-time.
- Uses a backend translation API or integration (e.g., Google Translate API).

### 🖼️ Image to Text
- Upload an image with Sinhala or English text.
- The app extracts and displays the text using OCR (Tesseract.js or similar).

### 🎙️ Voice to Text
- Speak into your microphone to convert speech to text.
- Supports both Sinhala and English inputs (Web Speech API or similar).

### 🧠 Quiz Generator
- Automatically generates vocabulary quizzes based on your translation history.
- Helps reinforce language learning.

### 📌 Bookmark Management
- Save important translations to access later.
- Organized and searchable.

### 📝 Notes Section
- Keep notes or personal vocabulary lists.
- Rich text editing supported.

---

## 🛠️ Tech Stack

| Layer       | Technology            |
|-------------|------------------------|
| Frontend    | React.js, Tailwind CSS |
| Backend     | Node.js, Express.js    |
| Database    | MongoDB                |
| OCR         | Tesseract.js           |
| Voice Input | Web Speech API         |
| Translation | Google Translate API / Custom Logic |

---

## 🧪 Getting Started

### ⚙️ Prerequisites
- Node.js and npm
- MongoDB installed and running

### 🚀 Run Locally

```bash
# Clone the project
git clone https://github.com/your-username/your-repo.git
cd your-repo

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

# Run both servers (you can use concurrently)
npm run dev
