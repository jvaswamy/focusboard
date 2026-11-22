function StatCard({ label, value, detail, icon: Icon, tone }) {
  return (
    <article className="stat-card">
      <span className={`stat-icon icon-${tone}`}><Icon size={17} strokeWidth={1.9} aria-hidden="true" /></span>
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
      <p className="stat-detail">{detail}</p>
    </article>
  )
}

export default StatCard
