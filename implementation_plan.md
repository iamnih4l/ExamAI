# ExamShield AI - Real Functionality Upgrade Plan

This document outlines the architectural changes required to upgrade ExamShield AI from a pure frontend simulator to a functionally real backend system using actual cryptography and database interactions.

## Goal Description

Transition the "AI Generator" and "Multi-Party Authorization" modules from client-side simulations to real backend processes. We will implement genuine AES-256 encryption using Node.js's native crypto libraries, meaning the exam paper will actually be locked into an unreadable state in the database until the correct cryptographic key is provided by the authorization node.

## User Review Required

> [!IMPORTANT]
> **API Keys:** To implement *true* Generative AI (where the AI writes brand new questions on the fly), we would need an API key for OpenAI or Gemini. Since we don't have one configured right now, I propose we implement an **Algorithmic Assembly Engine** instead. This engine will use the backend to dynamically fetch, shuffle, and balance real questions from our SQLite database based on the selected difficulty curve. Is this acceptable for now?
> 
> **Authentication:** For the Multi-Party Auth, I will build a real backend endpoint that validates the OTPs and physically decrypts the payload. We will use static hardcoded OTPs (e.g., `123456`) for the demo, rather than setting up a paid SMS service like Twilio.

## Proposed Changes

---

### Database Schema Updates
#### [MODIFY] [db.ts](file:///c:/Users/nihal/OneDrive/Desktop/ExamAI/src/lib/db.ts)
- Update the `papers` table to store `encryptedPayload` (the AES encrypted cipher) and `iv` (Initialization Vector). 
- Add a table for tracking authorization states.

### Backend API Routes
#### [NEW] `src/app/api/generate/route.ts`
- Create a backend endpoint that:
  1. Queries the SQLite database for questions matching the requested subjects and difficulty distribution.
  2. Generates a secure, random 256-bit AES key and a 128-bit IV.
  3. Encrypts the final exam paper JSON.
  4. Stores the encrypted blob in the SQLite database and returns the `versionId` and `packageId`.

#### [NEW] `src/app/api/unlock/route.ts`
- Create a backend endpoint that:
  1. Accepts the Package ID and the OTPs from the 3 authorized nodes.
  2. Verifies the authorization.
  3. Uses the AES key to decrypt the payload.
  4. Returns the decrypted exam paper to the frontend.

### Frontend Integration
#### [MODIFY] [Generate Page](file:///c:/Users/nihal/OneDrive/Desktop/ExamAI/src/app/generate/page.tsx)
- Replace `setTimeout` simulations with actual `fetch` calls to `/api/generate`.
- The frontend will no longer "know" what the questions are until the decryption phase.

#### [MODIFY] [Auth Page](file:///c:/Users/nihal/OneDrive/Desktop/ExamAI/src/app/auth/page.tsx)
- Replace client-side state unlocking with a secure call to `/api/unlock`.
- Display the actual decrypted payload returned by the server.

---

## Verification Plan
1. **Verify Encryption:** I will inspect the SQLite database to confirm that the generated papers are stored as unreadable encrypted blobs.
2. **Verify Decryption:** We will run the authorization sequence and ensure the paper correctly decrypts only when all 3 keys are provided.
3. **Verify Assembly:** Check that the generated paper actually adheres to the 30% Easy, 50% Medium, 20% Hard distribution curve requested in the UI.
