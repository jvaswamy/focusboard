function StatCard({ label, value, detail, icon: Icon, tone, progress }) {
  return (
    <article className={`stat-card stat-${tone}`}>
      <div className="stat-topline">
        <span className={`stat-icon icon-${tone}`}><Icon size={17} strokeWidth={1.9} aria-hidden="true" /></span>
        {progress !== undefined && <span className="stat-trend">this week</span>}
      </div>
      <p className="stat-label">{label}</p>
      <div className="stat-value-row">
        <p className="stat-value">{value}</p>
        {progress !== undefined && (
          <div className="mini-ring" role="img" aria-label={`${progress}% completed`} style={{ '--progress': `${progress}%` }}>
            <span>{progress}%</span>
          </div>
        )}
      </div>
      <p className="stat-detail">{detail}</p>
      {progress !== undefined && (
        <div className="stat-progress" role="progressbar" aria-label="Task completion" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
          <span style={{ width: `${progress}%` }} />
        </div>
      )}
    </article>
  )
}

export default StatCard
