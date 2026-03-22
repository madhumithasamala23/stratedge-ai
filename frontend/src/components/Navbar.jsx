import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#060910]/90 backdrop-blur-xl border-b border-[#1e2a36] px-8 h-14 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]"></div>
        <span className="font-black text-lg tracking-tight" style={{fontFamily:'system-ui'}}>
          Strat<span className="text-[#00e5ff]">Edge</span> AI
        </span>
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/" className="text-[#64748b] text-sm hover:text-white transition-colors">Home</Link>
        <Link to="/build" className="text-[#64748b] text-sm hover:text-white transition-colors">Features</Link>
        <Link to="/" className="border border-[#1e2a36] text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:border-[#00e5ff] hover:text-[#00e5ff] transition-all">
          Get Started
        </Link>
      </div>
    </nav>
  )
}

export default Navbar