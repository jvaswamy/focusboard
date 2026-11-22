const filters = ['All tasks', 'To do', 'In progress', 'Completed']

function FilterTabs({ value, onChange, counts }) {
  return (
    <div className="filter-tabs" role="group" aria-label="Filter tasks by status">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          className={`filter-tab${value === filter ? ' filter-tab-active' : ''}`}
          aria-pressed={value === filter}
          onClick={() => onChange(filter)}
        >
          {filter}<span className="filter-count">{counts[filter]}</span>
        </button>
      ))}
    </div>
  )
}

export default FilterTabs
