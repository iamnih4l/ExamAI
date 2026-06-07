import { getDb } from "@/lib/db";
import { BookOpen, Filter, Search } from "lucide-react";
import { PageTransition, ScrollReveal } from "@/components/PageTransition";

export default async function QuestionsPage() {
  const db = await getDb();
  const questions = await db.all('SELECT * FROM questions');

  return (
    <PageTransition>
      <div className="space-y-6 pb-12 pt-4">
        <ScrollReveal delay={0.1}>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-glow text-primary uppercase flex items-center gap-3">
              <BookOpen className="h-10 w-10" />
              Question Matrix
            </h1>
            <p className="text-primary/70 mt-2 font-mono tracking-widest text-sm uppercase">Manage and review examination nodes</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 glass-panel rounded-xl p-4 cyber-border">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
              <input 
                type="text" 
                placeholder="Query nodes by topic..." 
                className="w-full bg-background/50 border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-foreground font-mono"
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button className="flex items-center gap-2 bg-card border border-primary/30 px-4 py-2 rounded-lg text-sm text-primary hover:bg-primary/20 transition-colors font-mono uppercase tracking-wider shadow-[0_0_10px_rgba(0,240,255,0.1)]">
                <Filter className="h-4 w-4" />
                Subject
              </button>
              <button className="flex items-center gap-2 bg-card border border-primary/30 px-4 py-2 rounded-lg text-sm text-primary hover:bg-primary/20 transition-colors font-mono uppercase tracking-wider shadow-[0_0_10px_rgba(0,240,255,0.1)]">
                <Filter className="h-4 w-4" />
                Difficulty
              </button>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="glass-panel rounded-xl overflow-hidden cyber-border">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-primary/10 border-b border-border text-primary font-mono tracking-widest uppercase text-xs">
                  <tr>
                    <th className="px-6 py-4 font-bold">Node ID</th>
                    <th className="px-6 py-4 font-bold">Subject</th>
                    <th className="px-6 py-4 font-bold">Topic</th>
                    <th className="px-6 py-4 font-bold">Difficulty</th>
                    <th className="px-6 py-4 font-bold w-1/3">Data Payload</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {questions.map((q) => (
                    <tr key={q.id} className="hover:bg-primary/10 transition-colors">
                      <td className="px-6 py-4 font-mono text-primary font-bold">{q.id}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/50 uppercase tracking-wider">
                          {q.subject}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-foreground font-medium">{q.topic}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold border uppercase tracking-wider
                          ${q.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' : 
                            q.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' : 
                            'bg-destructive/20 text-destructive border-destructive/50'}`}>
                          {q.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-secondary-foreground truncate max-w-xs font-mono text-xs" title={q.questionText}>
                        {q.questionText}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
