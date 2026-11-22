import { CalendarDays, CheckSquare2, LayoutDashboard, Sparkles } from 'lucide-react'

const navigation = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Today', icon: CalendarDays },
  { label: 'All tasks', icon: CheckSquare2 },
]

function Sidebar({ activeItem, isOpen, onNavigate, taskCount }) {
  return (
    <aside className={`sidebar${isOpen ? ' sidebar-open' : ''}`} aria-label="Main navigation">
      <a className="brand" href="#dashboard" onClick={(event) => { event.preventDefault(); onNavigate('Overview') }}>
        <span className="brand-mark"><Sparkles size={19} fill="currentColor" aria-hidden="true" /></span>
        <span>focus<span className="brand-light">board</span></span>
      </a>
      <div className="workspace-switcher">
        <div className="workspace-avatar" aria-hidden="true">S</div>
        <div className="workspace-copy"><strong>Studio North</strong><span>Personal workspace</span></div>
        <span className="workspace-chevron" aria-hidden="true">⌄</span>
      </div>
      <p className="nav-label">WORKSPACE</p>
      <nav className="primary-nav">
        {navigation.map(({ label, icon: Icon }) => (
          <button
            className={`nav-item${activeItem === label ? ' nav-item-active' : ''}`}
            type="button"
            key={label}
            aria-current={activeItem === label ? 'page' : undefined}
            onClick={() => onNavigate(label)}
          >
            <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
            <span>{label}</span>
            {label === 'All tasks' && <span className="nav-count">{taskCount}</span>}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="upgrade-card">
          <div className="upgrade-icon"><Sparkles size={16} aria-hidden="true" /></div>
          <p className="upgrade-title">Make room for focus</p>
          <p className="upgrade-description">Small steps create big things. You’ve got this!</p>
          <div className="week-progress"><span /></div>
          <p className="week-progress-label">Your week is taking shape</p>
        </div>
        <div className="profile-row">
          <div className="profile-avatar" aria-hidden="true">AL</div>
          <div className="profile-copy"><strong>Alex Lane</strong><span>Free plan</span></div>
          <span className="profile-menu" aria-hidden="true">···</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
