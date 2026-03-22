import { useNavigate } from 'react-router-dom'

const stages = [
  {
    id: 1,
    power: 'Ignite',
    who: 'School Student · Class 8–12',
    icon: '🔥',
    color: '#00e5ff',
    bg: 'rgba(0,229,255,0.1)',
    border: 'rgba(0,229,255,0.5)',
    shadow: 'rgba(0,229,255,0.08)',
    route: '/ignite',
    features: ['Stream selector', 'Entrance exam paths', 'College shortlisting', 'Career awareness']
  },
  {
    id: 2,
    power: 'Build',
    who: 'College Student · UG / PG',
    icon: '⚙️',
    color: '#a78bfa',
    bg: 'rgba(124,58,237,0.1)',
    border: 'rgba(124,58,237,0.5)',
    shadow: 'rgba(124,58,237,0.08)',
    route: '/build',
    features: ['Skill gap analyzer', 'Internship readiness', 'Resume roaster', 'Placement prep']
  },
  {
    id: 3,
    power: 'Accelerate',
    who: 'Working Professional · 1–10 yrs',
    icon: '⚡',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.1)',
    border: 'rgba(245,158,11,0.5)',
    shadow: 'rgba(245,158,11,0.08)',
    route: '/accelerate',
    features: ['Career switch analyzer', 'Salary benchmarking', 'Upskill roadmap', 'LinkedIn optimizer']
  },
  {
    id: 4,
    power: 'Dominate',
    who: 'Job Seeker · Actively hunting',
    icon: '👑',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.1)',
    border: 'rgba(16,185,129,0.5)',
    shadow: 'rgba(16,185,129,0.08)',
    route: '/dominate',
    features: ['Job match score', 'Mock interviews', 'Cover letter gen', 'Application tracker']
  }
]

function Home() {
  const navigate = useNavigate()

  return (
    <main className="relative">
      {/* Background glows */}
      <div className="fixed w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{background:'radial-gradient(circle,rgba(0,229,255,.05) 0%,transparent 70%)',top:'-200px',right:'-100px'}}/>
      <div className="fixed w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{background:'radial-gradient(circle,rgba(124,58,237,.04) 0%,transparent 70%)',bottom:'0',left:'-100px'}}/>

      {/* Hero */}
      <section className="max-w-3xl mx-auto text-center px-8 pt-16 pb-12">
        <div className="inline-flex items-center gap-2 bg-[rgba(0,229,255,0.07)] border border-[rgba(0,229,255,0.18)] rounded-full px-4 py-1.5 text-[11px] text-[#00e5ff] font-medium mb-8 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse"></span>
          AI-Powered Career Intelligence
        </div>
        <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tighter mb-5" style={{fontFamily:'system-ui'}}>
          One platform.<br />
          <span className="text-[#00e5ff]">Your entire</span>{' '}
          <span className="text-[#64748b]">career journey.</span>
        </h1>
        <p className="text-[#64748b] text-base leading-relaxed max-w-md mx-auto mb-4 font-light">
          From choosing your school stream to dominating your industry — StratEdge adapts to exactly where you are.
        </p>
      </section>

      {/* Stage selector */}
      <div className="text-center text-[11px] tracking-widest uppercase text-[#64748b] font-semibold mb-5">
        Who are you? Select your stage.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto px-8 mb-16">
        {stages.map(stage => (
          <div
            key={stage.id}
            onClick={() => navigate(stage.route)}
            className="rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1"
            style={{
              background:'#0f1923',
              border:`1.5px solid #1e2a36`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = stage.border
              e.currentTarget.style.boxShadow = `0 12px 40px ${stage.shadow}`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#1e2a36'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
              style={{background: stage.bg}}>
              {stage.icon}
            </div>
            <div className="text-xl font-black tracking-tight mb-1" style={{color: stage.color, fontFamily:'system-ui'}}>
              {stage.power}
            </div>
            <div className="text-[11px] text-[#64748b] mb-4">{stage.who}</div>
            <div className="flex flex-col gap-1.5">
              {stage.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-[11px] text-[#64748b] font-light">
                  <div className="w-1 h-1 rounded-full flex-shrink-0" style={{background: stage.color}}></div>
                  {f}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="border-t border-[#1e2a36] py-5 text-center">
        <p className="text-xs text-[#64748b]">
  © {new Date().getFullYear()} StratEdge AI. All rights reserved. &nbsp;&nbsp;Developed by <span className="text-[#00e5ff] font-medium">Madhumitha Samala</span>
      </p>
      </footer>
    </main>
  )
}

export default Home