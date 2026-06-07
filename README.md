<div align="center">
  
  # 🛡️ ExamShield AI
  **The ultimate defense against examination leaks.**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-3D-black?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
  [![SQLite](https://img.shields.io/badge/SQLite-DB-blue?style=for-the-badge&logo=sqlite)](https://sqlite.org/)

  <p align="center">
    A futuristic, military-grade web application demonstrating a secure examination paper generation and distribution system. Designed to eliminate paper leaks using Zero-Trust architecture, AES-256 encryption, and steganographic watermarking.
  </p>

  ### 🌐 [Live Demo: View ExamShield AI on Vercel](https://exam-ai-zeta-seven.vercel.app)
</div>

---

## ⚙️ How It Works (Deployment Mechanics)

To ensure smooth, zero-configuration deployment on **Vercel's Serverless environment**, ExamShield AI uses a hybrid architectural approach:
- **In-Memory Database**: For the live demo, the backend utilizes an ephemeral, in-memory Mock DB instead of a persistent SQLite file. This prevents native binary compilation errors (`GLIBC` version mismatches) on Vercel's AWS Lambda infrastructure while still perfectly demonstrating the database interactions.
- **Stateless Persistence**: Because serverless functions can "cold-start" and lose memory between routing calls, the demo automatically maintains state long enough for a typical user walkthrough (Generate -> Copy Hash -> Authenticate -> Unlock) during a "warm" lambda phase.
- **Real Cryptography**: Despite the mocked database, the backend uses Node's native `crypto` library to perform mathematically authentic **AES-256-CBC encryption** on the generated exam papers before sending them back to the client.

## ⚡ Core Features

*   **🧠 AI Assembly Core**: Dynamically fetches, shuffles, and balances examination questions from a database based on an exact difficulty curve (Easy, Medium, Hard).
*   **🔒 Quantum-Resistant Locking**: Implements true **AES-256-CBC encryption** on the server. The exam paper is locked into an unreadable cryptographic cipher in the database before it ever reaches the client.
*   **🔑 Multi-Party Authorization (Consensus)**: A Zero-Trust protocol requiring three distinct cryptographic keys (Center Head, Govt Observer, Independent Auditor) to mathematically reconstruct the master decryption key and unlock the payload.
*   **🖨️ Physical Manifest Node**: Simulates the injection of steganographic, invisible microscopic meshes into printed papers to track the exact printer, node, and timestamp of the print job.
*   **🚨 Threat Analyzer**: A simulated leak-detection pipeline that reverse-engineers the steganographic mesh from uploaded photos of leaked papers to instantly identify the source.
*   **🌐 Cyberpunk 3D Interface**: Highly immersive "Security Operations Center" (SOC) UI, featuring `framer-motion` 3D scroll effects, hover tilts, neon glow styling, and interactive data matrices.

---

## 🛠️ Technology Stack

*   **Frontend**: Next.js (App Router), React, Tailwind CSS v4
*   **Animations**: Framer Motion (3D Hardware-Accelerated Transforms), Lucide Icons
*   **Backend**: Next.js API Routes (Node.js)
*   **Database**: SQLite (`sqlite` & `sqlite3` driver)
*   **Cryptography**: Node.js native `crypto` module

---

## 🚀 Quick Start Guide

### 1. Clone & Install
Ensure you have Node.js installed, then clone the repository and install the dependencies:

```bash
git clone <your-repo-url>
cd ExamAI
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

### 3. Open the Dashboard
Navigate to [http://localhost:3000](http://localhost:3000) in your browser to access the Command Center. The application will automatically seed the SQLite database with 50 mock questions on first load.

---

## 📖 Interactive Walkthrough (How to Test)

To fully experience the functioning cryptographic pipeline, follow these steps:

1.  **Generate a Paper:** 
    * Navigate to **AI Assembly** (`/generate`).
    * Click `Initialize Core Assembly`. The backend will pull random questions and create a payload.
    * Click `Engage AES-256` to encrypt the payload.
    * **Crucial:** Copy the `Crypto Hash` (Package ID) displayed on the "Payload Secured" screen (e.g., `ENC-XXXX-XXXX`).

2.  **Unlock the Paper:**
    * Navigate to the **Auth Protocol** (`/auth`) tab in the sidebar.
    * Paste the `Crypto Hash` into the **Target Package Hash** input at the top right.
    * Click `Authenticate` for all three roles and enter the demo OTP: `123456`.
    * Click `Execute Unlock`. The server will decrypt the AES-256 cipher and reveal the actual questions!

3.  **Trace a Leak:**
    * Navigate to the **Leak Simulator** (`/leak`).
    * Click `Force Demo Inject` to watch the system run a forensic scan, isolate the steganographic mesh, and attribute the simulated leak to "Mysore Center 42".

---

## 🔒 Security Notice
*Note: This project is a demonstration of concept. While it uses genuine AES-256 encryption for the payloads, the OTP authorization workflow is simplified for demo purposes. Do not use this exact implementation for production national-security applications without integrating a true HSM (Hardware Security Module) and actual Shamir's Secret Sharing algorithms.*
