import { ChevronDown, ChevronRight, Menu } from 'lucide-react'

function Header({ currentPage, onMenuToggle }) {
  return (
    <header className="topbar">
      <button className="icon-button mobile-menu-button" type="button" aria-label="Open navigation menu" onClick={onMenuToggle}>
        <Menu size={20} aria-hidden="true" />
      </button>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <span>Workspace</span>
        <ChevronRight size={13} aria-hidden="true" />
        <span className="breadcrumb-current" aria-current="page">{currentPage}</span>
      </nav>
      <div className="topbar-actions">
        <div className="topbar-user" role="img" aria-label="User profile: JD">
          <span className="profile-avatar topbar-avatar" aria-hidden="true">JD</span>
          <ChevronDown size={15} aria-hidden="true" />
        </div>
      </div>
    </header>
  )
}

export default Header
