import { useState } from 'react'
import axios from 'axios'

function Accelerate() {
  const [skills, setSkills] = useState('')
  const [role, setRole] = useState('')
  const [experience, setExperience] = useState('3')
  const [loading, setLoading] = useState(false)
  const [careers, setCareers] = useState(null)
  const [gaps, setGaps] = useState(null)
  const [market, setMarket] = useState(null)

  const analyze = async () => {
    if (!skills.trim() || !role.trim()) return
    setLoading(true)
    setCareers(null)
    setGaps(null)
    setMarket(null)
    try {
      const [careerRes, gapRes, marketRes] = await Promise.all([
        axios.post('https://stratedge-ai.up.railway.app/api/career-paths', {
          skills,
          experience: `${experience} years professional`
        }),
        axios.post('https://stratedge-ai.up.railway.app/api/skill-gap', {
          skills,
          target_role: role
        }),
        axios.post('https://stratedge-ai.up.railway.app/api/market-insights', {
          domain: role
        })
      ])
      setCareers(careerRes.data.careers)
      setGaps(gapRes.data.gaps)
      setMarket(marketRes.data.insights)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <main className="max-w-4xl mx-auto px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.3)] rounded-full px-4 py-1.5 text-[11px] text-[#f59e0b] font-medium mb-4 tracking-widest uppercase">
          ⚡ Accelerate Mode — Working Professional
        </div>
        <h1 className="text-4xl font-black tracking-tighter mb-2" style={{fontFamily:'system-ui'}}>
          Level up your <span className="text-[#f59e0b]">career</span>
        </h1>
        <p className="text-[#64748b] font-light">Get AI-powered insights to switch roles, upskill faster, and benchmark your market value.</p>
      </div>

      {/* Input */}
      <div className="bg-[#0f1923] border border-[#1e2a36] rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-[11px] tracking-widest uppercase text-[#64748b] font-semibold mb-2 block">Current Skills</label>
            <textarea
              value={skills}
              onChange={e => setSkills(e.target.value)}
              placeholder="e.g. Python, Django, AWS, SQL, Team Leadership..."
              className="w-full bg-[#131920] border border-[#1e2a36] rounded-xl px-4 py-3 text-sm text-white placeholder-[#64748b] outline-none focus:border-[rgba(245,158,11,0.4)] transition-colors resize-none font-light"
              rows={3}
            />
          </div>
          <div>
            <label className="text-[11px] tracking-widest uppercase text-[#64748b] font-semibold mb-2 block">Target Role</label>
            <textarea
              value={role}
              onChange={e => setRole(e.target.value)}
              placeholder="e.g. Engineering Manager, ML Engineer, CTO..."
              className="w-full bg-[#131920] border border-[#1e2a36] rounded-xl px-4 py-3 text-sm text-white placeholder-[#64748b] outline-none focus:border-[rgba(245,158,11,0.4)] transition-colors resize-none font-light"
              rows={3}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <select
            value={experience}
            onChange={e => setExperience(e.target.value)}
            className="flex-1 bg-[#131920] border border-[#1e2a36] rounded-xl px-4 py-2.5 text-sm text-white outline-none cursor-pointer"
          >
            <option value="1">1 year experience</option>
            <option value="2">2 years experience</option>
            <option value="3">3 years experience</option>
            <option value="5">5 years experience</option>
            <option value="7">7 years experience</option>
            <option value="10">10+ years experience</option>
          </select>
          <button
            onClick={analyze}
            disabled={loading}
            className="bg-[#f59e0b] text-black px-6 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all hover:opacity-90 hover:-translate-y-0.5 disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Accelerate →'}
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-16">
          <div className="w-8 h-8 border-2 border-[#f59e0b] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#64748b] text-sm">AI is analyzing your career trajectory...</p>
        </div>
      )}

      {/* Results */}
      {careers && gaps && market && (
        <div className="flex flex-col gap-6">
          {/* Career paths + skill gaps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Career Paths */}
            <div className="bg-[#0f1923] border border-[#1e2a36] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-base tracking-tight">Next Roles</h2>
                <span className="text-[10px] bg-[rgba(245,158,11,0.1)] text-[#f59e0b] px-2.5 py-1 rounded-full font-semibold tracking-wider">MATCHES</span>
              </div>
              {careers.map((c, i) => (
                <div key={i} className="flex items-center gap-3 py-3 border-b border-[#1e2a36] last:border-0">
                  <span className="text-[11px] text-[#64748b] w-5 font-bold">0{c.rank}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{c.role}</div>
                    <div className="text-[11px] text-[#64748b] font-light mt-0.5">{c.timeline}</div>
                  </div>
                  <span className="text-[#f59e0b] text-sm font-bold">{c.match}%</span>
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
                      style={{width:`${g.current_level}%`, background:'linear-gradient(90deg,#f59e0b,#fcd34d)'}}
                    />
                  </div>
                  <div className="text-[10px] text-[#64748b] mt-1 font-light">{g.resource}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Insights */}
          <div className="bg-[#0f1923] border border-[#1e2a36] rounded-2xl p-6">
            <h2 className="font-bold text-base tracking-tight mb-5">Market Pulse</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-[11px] tracking-widest uppercase text-[#64748b] font-semibold mb-3">Hot Skills</div>
                <div className="flex flex-wrap gap-2">
                  {market.hot_skills?.map((s, i) => (
                    <span key={i} className="px-3 py-1 rounded-full text-[11px] font-medium border border-[rgba(245,158,11,0.3)] text-[#f59e0b] bg-[rgba(245,158,11,0.05)]">
                      {s.trend === 'up' ? '↑' : '→'} {s.skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[11px] tracking-widest uppercase text-[#64748b] font-semibold mb-3">Top Roles & Salary</div>
                {market.top_roles?.map((r, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-[#1e2a36] last:border-0">
                    <span className="text-sm font-medium">{r.role}</span>
                    <span className="text-[11px] text-[#f59e0b] font-medium">{r.avg_salary}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 bg-[rgba(245,158,11,0.05)] border border-[rgba(245,158,11,0.2)] rounded-xl p-4">
              <p className="text-[11px] text-[#64748b] font-light">{market.insight}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Accelerate