import { CalendarDays, LayoutGrid, List, Settings2 } from 'lucide-react'

const navigation = [
  { label: 'Overview', icon: LayoutGrid },
  { label: 'My tasks', icon: List },
  { label: 'Calendar', icon: CalendarDays },
  { label: 'Settings', icon: Settings2 },
]

function Sidebar({ activeItem, isOpen, onNavigate }) {
  return (
    <aside className={`sidebar${isOpen ? ' sidebar-open' : ''}`} aria-label="Main navigation">
      <a className="brand" href="#dashboard" onClick={(event) => { event.preventDefault(); onNavigate('Overview') }}>
        <span className="brand-mark"><LayoutGrid size={18} strokeWidth={2.6} aria-hidden="true" /></span>
        <span>Focus<span className="brand-light">Board</span></span>
      </a>
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
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
