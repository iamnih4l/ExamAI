import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { examName, count = 10, subjects = [], difficulty = {} } = body;

    const db = await getDb();
    
    // 1. Algorithmic Assembly: Fetch questions from the DB
    // For the demo, we'll just grab a random subset of questions.
    // In a real scenario, we'd build a complex SQL query to match the exact distribution.
    const allQuestions = await db.all('SELECT * FROM questions ORDER BY RANDOM() LIMIT ?', [count]);
    
    if (allQuestions.length === 0) {
      return NextResponse.json({ error: "No questions available in the database." }, { status: 400 });
    }

    const payload = JSON.stringify(allQuestions);

    // 2. Cryptographic Encryption (AES-256-CBC)
    const algorithm = 'aes-256-cbc';
    const key = crypto.randomBytes(32); // 256-bit key
    const iv = crypto.randomBytes(16);  // 128-bit IV

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(payload, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // 3. Generate Identifiers
    const versionId = `${examName.toUpperCase()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;
    const packageId = `ENC-${crypto.randomBytes(2).toString('hex').toUpperCase()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;

    // 4. Store in Database
    await db.run(
      `INSERT INTO papers (packageId, versionId, examName, status, createdAt, aesKey, iv, encryptedPayload) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        packageId, 
        versionId, 
        examName, 
        'LOCKED', 
        new Date().toISOString(), 
        key.toString('hex'), 
        iv.toString('hex'), 
        encrypted
      ]
    );

    // 5. Log Event
    await db.run(
      `INSERT INTO audit_logs (timestamp, event, details) VALUES (?, ?, ?)`,
      [new Date().toISOString(), 'ENCRYPT', `Generated and encrypted package ${packageId} for exam ${versionId}`]
    );

    return NextResponse.json({ versionId, packageId });

  } catch (error) {
    console.error("Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate paper" }, { status: 500 });
  }
}
