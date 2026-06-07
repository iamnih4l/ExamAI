// In-memory mock database for Vercel Serverless environment
// Replaces sqlite3 to fix native compilation issues during deployment

export interface Question {
  id: string;
  subject: string;
  topic: string;
  difficulty: string;
  questionText: string;
  options: string;
  correctAnswer: string;
}

export interface Paper {
  packageId: string;
  versionId: string;
  examName: string;
  status: string;
  createdAt: string;
  aesKey: string;
  iv: string;
  encryptedPayload: string;
}

export interface AuditLog {
  id: number;
  timestamp: string;
  event: string;
  details: string;
}

let questions: Question[] = [];
let papers: Paper[] = [];
let auditLogs: AuditLog[] = [];
let isSeeded = false;

function seedDb() {
  if (isSeeded) return;

  const subjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology'];
  const topics = ['Kinematics', 'Organic Chemistry', 'Calculus', 'Genetics'];
  const difficulties = ['Easy', 'Medium', 'Hard'];

  for (let i = 1; i <= 50; i++) {
    const subject = subjects[i % 4];
    const topic = topics[i % 4];
    const diff = difficulties[i % 3];
    
    questions.push({
      id: `Q${1000 + i}`,
      subject,
      topic,
      difficulty: diff,
      questionText: `Sample question ${i} for ${subject} on ${topic}?`,
      options: JSON.stringify(['Option A', 'Option B', 'Option C', 'Option D']),
      correctAnswer: 'Option A'
    });
  }
  
  isSeeded = true;
}

class MockDB {
  async all(query: string, params: any[] = []): Promise<any[]> {
    if (query.includes('FROM questions')) {
      // Simulate ORDER BY RANDOM() LIMIT ?
      const limitMatch = query.match(/LIMIT\s+\?/i);
      const limit = limitMatch && params[0] ? params[0] : questions.length;
      
      const shuffled = [...questions].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, limit);
    }
    return [];
  }

  async get(query: string, params: any[] = []): Promise<any> {
    if (query.includes('FROM papers')) {
      const packageId = params[0];
      return papers.find(p => p.packageId === packageId) || null;
    }
    return null;
  }

  async run(query: string, params: any[] = []): Promise<void> {
    if (query.includes('INSERT INTO papers')) {
      papers.push({
        packageId: params[0],
        versionId: params[1],
        examName: params[2],
        status: params[3],
        createdAt: params[4],
        aesKey: params[5],
        iv: params[6],
        encryptedPayload: params[7],
      });
    } else if (query.includes('UPDATE papers SET status')) {
      const status = params[0];
      const packageId = params[1];
      const paper = papers.find(p => p.packageId === packageId);
      if (paper) paper.status = status;
    } else if (query.includes('INSERT INTO audit_logs')) {
      auditLogs.push({
        id: Date.now(),
        timestamp: params[0],
        event: params[1],
        details: params[2]
      });
    }
  }
}

export async function getDb() {
  seedDb();
  return new MockDB();
}
