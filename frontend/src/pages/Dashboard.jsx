import { useNavigate } from 'react-router-dom'

const features = [
  {
    stage: 'Ignite',
    icon: '🔥',
    color: '#00e5ff',
    bg: 'rgba(0,229,255,0.1)',
    border: 'rgba(0,229,255,0.3)',
    route: '/ignite',
    desc: 'School student guidance',
    items: ['Stream selector', 'Entrance exam paths', 'College shortlisting', 'Career awareness']
  },
  {
    stage: 'Build',
    icon: '⚙️',
    color: '#a78bfa',
    bg: 'rgba(124,58,237,0.1)',
    border: 'rgba(124,58,237,0.3)',
    route: '/build',
    desc: 'College student tools',
    items: ['Skill gap analyzer', 'Career path finder', 'Internship readiness', 'Placement prep']
  },
  {
    stage: 'Accelerate',
    icon: '⚡',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.1)',
    border: 'rgba(245,158,11,0.3)',
    route: '/accelerate',
    desc: 'Professional growth tools',
    items: ['Career switch analyzer', 'Salary benchmarking', 'Upskill roadmap', 'Market insights']
  },
  {
    stage: 'Dominate',
    icon: '👑',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.1)',
    border: 'rgba(16,185,129,0.3)',
    route: '/dominate',
    desc: 'Job seeker arsenal',
    items: ['Resume roaster', 'Mock interviews', 'Cover letter gen', 'Job match score']
  }
]

function Dashboard() {
  const navigate = useNavigate()

  return (
    <main className="max-w-4xl mx-auto px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tighter mb-2" style={{fontFamily:'system-ui'}}>
          Your <span className="text-[#00e5ff]">Dashboard</span>
        </h1>
        <p className="text-[#64748b] font-light">All tools in one place. Pick your stage and get started.</p>
      </div>

      {/* Stage cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {features.map((f, i) => (
          <div
            key={i}
            onClick={() => navigate(f.route)}
            className="bg-[#0f1923] rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1"
            style={{border:`1.5px solid #1e2a36`}}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = f.border
              e.currentTarget.style.boxShadow = `0 12px 40px ${f.bg}`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#1e2a36'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{background: f.bg}}>
                {f.icon}
              </div>
              <div>
                <div className="font-black text-base tracking-tight" style={{color: f.color}}>{f.stage}</div>
                <div className="text-[11px] text-[#64748b]">{f.desc}</div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {f.items.map((item, j) => (
                <div key={j} className="flex items-center gap-2 text-[11px] text-[#64748b] font-light">
                  <div className="w-1 h-1 rounded-full flex-shrink-0" style={{background: f.color}}></div>
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-4 text-[11px] font-semibold tracking-wider" style={{color: f.color}}>
              Open {f.stage} →
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="bg-[#0f1923] border border-[#1e2a36] rounded-2xl p-6">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-black text-[#00e5ff] tracking-tighter">4</div>
            <div className="text-[11px] text-[#64748b] uppercase tracking-widest mt-1">User Stages</div>
          </div>
          <div>
            <div className="text-3xl font-black text-[#a78bfa] tracking-tighter">12+</div>
            <div className="text-[11px] text-[#64748b] uppercase tracking-widest mt-1">AI Features</div>
          </div>
          <div>
            <div className="text-3xl font-black text-[#10b981] tracking-tighter">∞</div>
            <div className="text-[11px] text-[#64748b] uppercase tracking-widest mt-1">Possibilities</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-10">
        <p className="text-xs text-[#64748b]">
          Built by <span className="text-[#00e5ff] font-medium">Madhumitha Samala</span>
        </p>
      </div>
    </main>
  )
}

export default Dashboard