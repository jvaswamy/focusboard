import { ChevronDown, Menu, Plus } from 'lucide-react'

function Header({ onNewTask, onMenuToggle }) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className="topbar">
      <button className="icon-button mobile-menu-button" type="button" aria-label="Open navigation menu" onClick={onMenuToggle}>
        <Menu size={20} aria-hidden="true" />
      </button>
      <p className="topbar-date">{today}</p>
      <div className="topbar-actions">
        <button className="button button-primary topbar-add" type="button" onClick={onNewTask}>
          <Plus size={17} aria-hidden="true" /><span>New task</span>
        </button>
        <div className="topbar-user" aria-label="Signed in as Alex Lane">
          <span className="profile-avatar topbar-avatar" aria-hidden="true">AL</span>
          <ChevronDown size={15} aria-hidden="true" />
        </div>
      </div>
    </header>
  )
}

export default Header
