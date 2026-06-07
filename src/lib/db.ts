import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

let db: Database | null = null;

export async function getDb() {
  if (db) return db;

  const dbPath = path.resolve(process.cwd(), 'database.sqlite');
  
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS questions (
      id TEXT PRIMARY KEY,
      subject TEXT,
      topic TEXT,
      difficulty TEXT,
      questionText TEXT,
      options TEXT,
      correctAnswer TEXT
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp TEXT,
      event TEXT,
      details TEXT
    );
    
    CREATE TABLE IF NOT EXISTS papers (
      packageId TEXT PRIMARY KEY,
      versionId TEXT,
      examName TEXT,
      status TEXT,
      createdAt TEXT,
      aesKey TEXT,
      iv TEXT,
      encryptedPayload TEXT
    );
  `);

  // Seed questions if empty
  const count = await db.get('SELECT COUNT(*) as count FROM questions');
  if (count.count === 0) {
    const subjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology'];
    const topics = ['Kinematics', 'Organic Chemistry', 'Calculus', 'Genetics'];
    const difficulties = ['Easy', 'Medium', 'Hard'];

    const insertStmt = await db.prepare(
      'INSERT INTO questions (id, subject, topic, difficulty, questionText, options, correctAnswer) VALUES (?, ?, ?, ?, ?, ?, ?)'
    );

    for (let i = 1; i <= 50; i++) {
      const subject = subjects[i % 4];
      const topic = topics[i % 4];
      const diff = difficulties[i % 3];
      
      await insertStmt.run(
        `Q${1000 + i}`,
        subject,
        topic,
        diff,
        `Sample question ${i} for ${subject} on ${topic}?`,
        JSON.stringify(['Option A', 'Option B', 'Option C', 'Option D']),
        'Option A'
      );
    }
    await insertStmt.finalize();
  }

  return db;
}
