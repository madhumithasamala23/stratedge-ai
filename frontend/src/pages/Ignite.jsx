import { useState } from 'react'
import axios from 'axios'

function Ignite() {
  const [interests, setInterests] = useState('')
  const [subjects, setSubjects] = useState('')
  const [grade, setGrade] = useState('10th')
  const [loading, setLoading] = useState(false)
  const [guidance, setGuidance] = useState(null)

  const analyze = async () => {
    if (!interests.trim() || !subjects.trim()) return
    setLoading(true)
    setGuidance(null)
    try {
      const res = await axios.post('https://stratedge-ai.up.railway.app//api/ignite', {
        interests,
        strong_subjects: subjects,
        class_grade: grade
      })
      setGuidance(res.data.guidance)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <main className="max-w-4xl mx-auto px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-[rgba(0,229,255,0.07)] border border-[rgba(0,229,255,0.18)] rounded-full px-4 py-1.5 text-[11px] text-[#00e5ff] font-medium mb-4 tracking-widest uppercase">
          🔥 Ignite Mode — School Student
        </div>
        <h1 className="text-4xl font-black tracking-tighter mb-2" style={{fontFamily:'system-ui'}}>
          Find your <span className="text-[#00e5ff]">perfect stream</span>
        </h1>
        <p className="text-[#64748b] font-light">Tell us your interests and strong subjects — we'll guide your entire career path.</p>
      </div>

      {/* Input */}
      <div className="bg-[#0f1923] border border-[#1e2a36] rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-[11px] tracking-widest uppercase text-[#64748b] font-semibold mb-2 block">Your Interests</label>
            <textarea
              value={interests}
              onChange={e => setInterests(e.target.value)}
              placeholder="e.g. computers, coding, drawing, sports, biology..."
              className="w-full bg-[#131920] border border-[#1e2a36] rounded-xl px-4 py-3 text-sm text-white placeholder-[#64748b] outline-none focus:border-[rgba(0,229,255,0.4)] transition-colors resize-none font-light"
              rows={3}
            />
          </div>
          <div>
            <label className="text-[11px] tracking-widest uppercase text-[#64748b] font-semibold mb-2 block">Strong Subjects</label>
            <textarea
              value={subjects}
              onChange={e => setSubjects(e.target.value)}
              placeholder="e.g. Maths, Physics, Biology, English..."
              className="w-full bg-[#131920] border border-[#1e2a36] rounded-xl px-4 py-3 text-sm text-white placeholder-[#64748b] outline-none focus:border-[rgba(0,229,255,0.4)] transition-colors resize-none font-light"
              rows={3}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <select
            value={grade}
            onChange={e => setGrade(e.target.value)}
            className="flex-1 bg-[#131920] border border-[#1e2a36] rounded-xl px-4 py-2.5 text-sm text-white outline-none cursor-pointer"
          >
            <option>8th</option>
            <option>9th</option>
            <option>10th</option>
            <option>11th</option>
            <option>12th</option>
          </select>
          <button
            onClick={analyze}
            disabled={loading}
            className="bg-[#00e5ff] text-black px-6 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all hover:opacity-90 hover:-translate-y-0.5 disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Guide Me →'}
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-16">
          <div className="w-8 h-8 border-2 border-[#00e5ff] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#64748b] text-sm">AI is finding your perfect path...</p>
        </div>
      )}

      {/* Results */}
      {guidance && (
        <div className="flex flex-col gap-6">
          {/* Stream recommendation */}
          <div className="bg-[#0f1923] border border-[rgba(0,229,255,0.3)] rounded-2xl p-6">
            <div className="text-[11px] tracking-widest uppercase text-[#00e5ff] font-semibold mb-2">Recommended Stream</div>
            <div className="text-2xl font-black tracking-tight mb-2" style={{fontFamily:'system-ui'}}>{guidance.recommended_stream}</div>
            <p className="text-[#64748b] text-sm font-light">{guidance.reason}</p>
          </div>

          {/* Career paths */}
          <div className="bg-[#0f1923] border border-[#1e2a36] rounded-2xl p-6">
            <h2 className="font-bold text-base tracking-tight mb-5">Career Paths</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guidance.career_paths.map((c, i) => (
                <div key={i} className="bg-[#131920] rounded-xl p-4">
                  <div className="text-sm font-bold mb-1">{c.career}</div>
                  <div className="text-[11px] text-[#00e5ff] mb-1">{c.entrance_exam}</div>
                  <div className="text-[11px] text-[#64748b] font-light">{c.timeline}</div>
                  <div className="text-[11px] text-[#64748b] font-light mt-1">{c.top_colleges?.join(', ')}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly plan */}
          <div className="bg-[#0f1923] border border-[#1e2a36] rounded-2xl p-6">
            <h2 className="font-bold text-base tracking-tight mb-5">Your Action Plan</h2>
            <div className="flex flex-col gap-3">
              {guidance.monthly_plan.map((m, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="text-[11px] text-[#00e5ff] font-bold w-24 flex-shrink-0 mt-0.5">{m.month}</div>
                  <div>
                    <div className="text-sm font-medium">{m.focus}</div>
                    <div className="text-[11px] text-[#64748b] font-light">{m.action}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tip */}
          <div className="bg-[rgba(0,229,255,0.05)] border border-[rgba(0,229,255,0.2)] rounded-2xl p-5">
            <div className="text-[11px] tracking-widest uppercase text-[#00e5ff] font-semibold mb-2">💡 Motivational Tip</div>
            <p className="text-sm text-[#64748b] font-light">{guidance.motivational_tip}</p>
          </div>
        </div>
      )}
    </main>
  )
}

export default Ignite