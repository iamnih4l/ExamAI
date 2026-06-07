import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { packageId, otps } = body;

    // 1. Verify Multi-Party Authorization (Shamir's Secret Simulation)
    // In a real app, these OTPs would be verified against a DB session, and then used to reconstruct the master key.
    // For this prototype, we require exactly 3 valid OTPs.
    if (!otps || otps.length !== 3 || !otps.every((otp: string) => otp === '123456')) {
      return NextResponse.json({ error: "Invalid or incomplete authorization keys." }, { status: 401 });
    }

    const db = await getDb();
    
    // 2. Retrieve Encrypted Payload
    const paper = await db.get('SELECT * FROM papers WHERE packageId = ?', [packageId]);
    
    if (!paper) {
      return NextResponse.json({ error: "Package not found." }, { status: 404 });
    }

    if (paper.status === 'UNLOCKED') {
      // Already unlocked, maybe just return it
    }

    // 3. Cryptographic Decryption
    const algorithm = 'aes-256-cbc';
    const key = Buffer.from(paper.aesKey, 'hex');
    const iv = Buffer.from(paper.iv, 'hex');

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(paper.encryptedPayload, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    const questions = JSON.parse(decrypted);

    // 4. Update Status
    await db.run('UPDATE papers SET status = ? WHERE packageId = ?', ['UNLOCKED', packageId]);

    // 5. Log Event
    await db.run(
      `INSERT INTO audit_logs (timestamp, event, details) VALUES (?, ?, ?)`,
      [new Date().toISOString(), 'UNLOCK', `Package ${packageId} decrypted via 3-Key consensus.`]
    );

    return NextResponse.json({ 
      success: true, 
      examName: paper.examName,
      versionId: paper.versionId,
      questions 
    });

  } catch (error) {
    console.error("Unlock Error:", error);
    return NextResponse.json({ error: "Failed to decrypt package. Keys may be corrupted." }, { status: 500 });
  }
}
