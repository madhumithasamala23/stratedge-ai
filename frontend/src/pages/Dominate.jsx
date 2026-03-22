import { useState } from 'react'
import axios from 'axios'

function Dominate() {
  const [skills, setSkills] = useState('')
  const [role, setRole] = useState('Software Engineer')
  const [resumeText, setResumeText] = useState('')
  const [loading, setLoading] = useState(false)
  const [roast, setRoast] = useState(null)
  const [interview, setInterview] = useState(null)
  const [answer, setAnswer] = useState('')
  const [interviewLoading, setInterviewLoading] = useState(false)

  const analyzeResume = async () => {
    if (!resumeText.trim()) return
    setLoading(true)
    setRoast(null)
    try {
      const res = await axios.post('https://stratedge-ai.up.railway.app/api/resume-roast', {
        resume_text: resumeText,
        target_role: role
      })
      setRoast(res.data.roast)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const startInterview = async () => {
    if (!skills.trim()) return
    setInterviewLoading(true)
    try {
      const res = await axios.post('https://stratedge-ai.up.railway.app/api/interview-question', {
        role,
        skills,
        answer: answer,
        question: interview?.question || ''
      })
      setInterview(res.data.interview)
      setAnswer('')
    } catch (err) {
      console.error(err)
    }
    setInterviewLoading(false)
  }

  return (
    <main className="max-w-4xl mx-auto px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.3)] rounded-full px-4 py-1.5 text-[11px] text-[#10b981] font-medium mb-4 tracking-widest uppercase">
          👑 Dominate Mode — Job Seeker
        </div>
        <h1 className="text-4xl font-black tracking-tighter mb-2" style={{fontFamily:'system-ui'}}>
          Own the <span className="text-[#10b981]">job market</span>
        </h1>
        <p className="text-[#64748b] font-light">Roast your resume and practice mock interviews with AI.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Resume Roaster */}
        <div className="flex flex-col gap-4">
          <div className="bg-[#0f1923] border border-[#1e2a36] rounded-2xl p-6">
            <h2 className="font-bold text-base tracking-tight mb-4">🔥 Resume Roaster</h2>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className="w-full bg-[#131920] border border-[#1e2a36] rounded-xl px-4 py-2.5 text-sm text-white outline-none cursor-pointer mb-3"
            >
              <option>Software Engineer</option>
              <option>ML Engineer</option>
              <option>Data Scientist</option>
              <option>Full Stack Developer</option>
              <option>Backend Developer</option>
              <option>DevOps Engineer</option>
            </select>
            <textarea
              value={resumeText}
              onChange={e => setResumeText(e.target.value)}
              placeholder="Paste your resume text here..."
              className="w-full bg-[#131920] border border-[#1e2a36] rounded-xl px-4 py-3 text-sm text-white placeholder-[#64748b] outline-none focus:border-[rgba(16,185,129,0.4)] transition-colors resize-none font-light"
              rows={6}
            />
            <button
              onClick={analyzeResume}
              disabled={loading}
              className="w-full mt-3 bg-[#10b981] text-black py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Roasting...' : 'Roast My Resume →'}
            </button>
          </div>

          {/* Roast Results */}
          {roast && (
            <div className="bg-[#0f1923] border border-[#1e2a36] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm">Resume Score</h3>
                <span className="text-2xl font-black text-[#10b981]">{roast.score}/100</span>
              </div>
              <p className="text-[#64748b] text-xs font-light mb-4">{roast.verdict}</p>
              <div className="flex flex-col gap-3">
                {roast.issues.map((issue, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="text-sm flex-shrink-0">
                      {issue.type === 'critical' ? '⚡' : issue.type === 'warning' ? '⚠️' : '✅'}
                    </span>
                    <div>
                      <div className="text-xs font-medium">{issue.issue}</div>
                      <div className="text-[11px] text-[#64748b] font-light">{issue.fix}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-[rgba(16,185,129,0.05)] border border-[rgba(16,185,129,0.2)] rounded-xl p-3">
                <div className="text-[10px] text-[#10b981] font-semibold tracking-wider uppercase mb-1">Top Fix</div>
                <div className="text-xs text-[#64748b] font-light">{roast.top_fix}</div>
              </div>
            </div>
          )}
        </div>

        {/* Mock Interview */}
        <div className="flex flex-col gap-4">
          <div className="bg-[#0f1923] border border-[#1e2a36] rounded-2xl p-6">
            <h2 className="font-bold text-base tracking-tight mb-4">🤖 Mock Interview</h2>
            <textarea
              value={skills}
              onChange={e => setSkills(e.target.value)}
              placeholder="Your skills e.g. Python, ML, FastAPI..."
              className="w-full bg-[#131920] border border-[#1e2a36] rounded-xl px-4 py-3 text-sm text-white placeholder-[#64748b] outline-none focus:border-[rgba(16,185,129,0.4)] transition-colors resize-none font-light mb-3"
              rows={2}
            />
            {interview && (
              <div className="mb-4">
                <div className="bg-[#131920] rounded-xl p-4 mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] bg-[rgba(16,185,129,0.1)] text-[#10b981] px-2 py-0.5 rounded-full font-semibold">{interview.category}</span>
                    <span className="text-[10px] bg-[rgba(245,158,11,0.1)] text-[#f59e0b] px-2 py-0.5 rounded-full font-semibold">{interview.difficulty}</span>
                  </div>
                  <p className="text-sm font-medium">{interview.question}</p>
                  <p className="text-[11px] text-[#64748b] mt-2 font-light">💡 {interview.hint}</p>
                </div>
                {interview.feedback?.score && (
                  <div className="bg-[rgba(16,185,129,0.05)] border border-[rgba(16,185,129,0.2)] rounded-xl p-4 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] text-[#10b981] font-semibold uppercase tracking-wider">Feedback</span>
                      <span className="text-lg font-black text-[#10b981]">{interview.feedback.score}/100</span>
                    </div>
                    <p className="text-[11px] text-[#64748b] font-light mb-1">✅ {interview.feedback.strengths}</p>
                    <p className="text-[11px] text-[#64748b] font-light mb-1">📈 {interview.feedback.improvements}</p>
                    <p className="text-[11px] text-[#64748b] font-light">💡 {interview.feedback.better_answer}</p>
                  </div>
                )}
                <textarea
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full bg-[#131920] border border-[#1e2a36] rounded-xl px-4 py-3 text-sm text-white placeholder-[#64748b] outline-none focus:border-[rgba(16,185,129,0.4)] transition-colors resize-none font-light"
                  rows={3}
                />
              </div>
            )}
            <button
              onClick={startInterview}
              disabled={interviewLoading}
              className="w-full bg-[#10b981] text-black py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all hover:opacity-90 disabled:opacity-50"
            >
              {interviewLoading ? 'Thinking...' : interview ? 'Submit Answer & Next Question →' : 'Start Mock Interview →'}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Dominate