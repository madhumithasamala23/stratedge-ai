import { useState } from 'react'
import axios from 'axios'

function Build() {
  const [skills, setSkills] = useState('')
  const [targetRole, setTargetRole] = useState('ML Engineer')
  const [loading, setLoading] = useState(false)
  const [careers, setCareers] = useState(null)
  const [gaps, setGaps] = useState(null)

  const analyze = async () => {
    if (!skills.trim()) return
    setLoading(true)
    setCareers(null)
    setGaps(null)
    try {
      const [careerRes, gapRes] = await Promise.all([
        axios.post('https://stratedge-ai.up.railway.app/api/career-paths', {
          skills,
          experience: 'college student'
        }),
        axios.post('https://stratedge-ai.up.railway.app/api/skill-gap', {
          skills,
          target_role: targetRole
        })
      ])
      setCareers(careerRes.data.careers)
      setGaps(gapRes.data.gaps)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <main className="max-w-4xl mx-auto px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.3)] rounded-full px-4 py-1.5 text-[11px] text-[#a78bfa] font-medium mb-4 tracking-widest uppercase">
          ⚙️ Build Mode — College Student
        </div>
        <h1 className="text-4xl font-black tracking-tighter mb-2" style={{fontFamily:'system-ui'}}>
          Find your <span className="text-[#a78bfa]">career path</span>
        </h1>
        <p className="text-[#64748b] font-light">Enter your skills and get AI-powered career recommendations and skill gap analysis.</p>
      </div>

      {/* Input */}
      <div className="bg-[#0f1923] border border-[#1e2a36] rounded-2xl p-6 mb-8">
        <label className="text-[11px] tracking-widest uppercase text-[#64748b] font-semibold mb-3 block">Your Skills</label>
        <textarea
          value={skills}
          onChange={e => setSkills(e.target.value)}
          placeholder="e.g. Python, Machine Learning, FastAPI, React, SQL, TensorFlow..."
          className="w-full bg-[#131920] border border-[#1e2a36] rounded-xl px-4 py-3 text-sm text-white placeholder-[#64748b] outline-none focus:border-[rgba(124,58,237,0.5)] transition-colors resize-none font-light"
          rows={3}
        />
        <div className="flex gap-3 mt-3">
          <select
            value={targetRole}
            onChange={e => setTargetRole(e.target.value)}
            className="flex-1 bg-[#131920] border border-[#1e2a36] rounded-xl px-4 py-2.5 text-sm text-white outline-none cursor-pointer"
          >
            <option>ML Engineer</option>
            <option>Data Scientist</option>
            <option>Full Stack Developer</option>
            <option>AI Research Engineer</option>
            <option>Backend Developer</option>
            <option>DevOps Engineer</option>
            <option>Cybersecurity Analyst</option>
          </select>
          <button
            onClick={analyze}
            disabled={loading}
            className="bg-[#7c3aed] text-white px-6 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all hover:opacity-90 hover:-translate-y-0.5 disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Analyze →'}
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-16">
          <div className="w-8 h-8 border-2 border-[#a78bfa] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#64748b] text-sm">AI is analyzing your profile...</p>
        </div>
      )}

      {/* Results */}
      {careers && gaps && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Career Paths */}
          <div className="bg-[#0f1923] border border-[#1e2a36] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-base tracking-tight">Career Matches</h2>
              <span className="text-[10px] bg-[rgba(124,58,237,0.1)] text-[#a78bfa] px-2.5 py-1 rounded-full font-semibold tracking-wider">TOP {careers.length}</span>
            </div>
            {careers.map((c, i) => (
              <div key={i} className="flex items-center gap-3 py-3 border-b border-[#1e2a36] last:border-0">
                <span className="text-[11px] text-[#64748b] w-5 font-bold">0{c.rank}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium">{c.role}</div>
                  <div className="text-[11px] text-[#64748b] font-light mt-0.5">{c.timeline}</div>
                </div>
                <span className="text-[#a78bfa] text-sm font-bold">{c.match}%</span>
              </div>
            ))}
          </div>

          {/* Skill Gaps */}
          <div className="bg-[#0f1923] border border-[#1e2a36] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-base tracking-tight">Skill Gaps</h2>
              <span className="text-[10px] bg-[rgba(245,158,11,0.1)] text-[#f59e0b] px-2.5 py-1 rounded-full font-semibold tracking-wider">TO LEARN</span>
            </div>
            {gaps.map((g, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm font-medium">{g.skill}</span>
                  <span className="text-[11px] text-[#64748b]">{g.priority}</span>
                </div>
                <div className="h-1.5 bg-[#131920] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${g.current_level}%`,
                      background:'linear-gradient(90deg,#7c3aed,#a78bfa)'
                    }}
                  />
                </div>
                <div className="text-[10px] text-[#64748b] mt-1 font-light">{g.resource}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}

export default Build