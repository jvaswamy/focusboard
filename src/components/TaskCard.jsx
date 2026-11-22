import { CalendarDays, CircleCheck, Circle, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'

function formatDueDate(value) {
  if (!value) return 'No due date'
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const isCompleted = task.status === 'Completed'

  return (
    <article className={`task-card${isCompleted ? ' task-completed' : ''}`}>
      <button
        type="button"
        className={`task-check${isCompleted ? ' task-check-done' : ''}`}
        aria-label={isCompleted ? `Mark ${task.title} as to do` : `Mark ${task.title} as completed`}
        onClick={() => onStatusChange(task.id, isCompleted ? 'To do' : 'Completed')}
      >
        {isCompleted ? <CircleCheck size={20} aria-hidden="true" /> : <Circle size={20} aria-hidden="true" />}
      </button>
      <div className="task-main">
        <div className="task-title-row">
          <h3>{task.title}</h3>
          <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
            <span />{task.priority}
          </span>
        </div>
        {task.description && <p className="task-description">{task.description}</p>}
        <div className="task-meta">
          <span className={`category-tag category-${task.category.toLowerCase()}`}>{task.category}</span>
          <span className="task-due"><CalendarDays size={13} aria-hidden="true" />{formatDueDate(task.dueDate)}</span>
          <label className="status-select-label">
            <span className="sr-only">Status for {task.title}</span>
            <select
              className={`status-select status-${task.status.toLowerCase().replace(' ', '-')}`}
              value={task.status}
              onChange={(event) => onStatusChange(task.id, event.target.value)}
            >
              <option>To do</option>
              <option>In progress</option>
              <option>Completed</option>
            </select>
          </label>
        </div>
      </div>
      <div className="task-menu-wrap">
        <button
          type="button"
          className="icon-button task-menu-trigger"
          aria-label={`Actions for ${task.title}`}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <MoreHorizontal size={19} aria-hidden="true" />
        </button>
        {menuOpen && (
          <div className="task-menu">
            <button type="button" onClick={() => { onEdit(task); setMenuOpen(false) }}>
              <Pencil size={14} aria-hidden="true" /> Edit task
            </button>
            <button type="button" className="delete-action" onClick={() => { onDelete(task); setMenuOpen(false) }}>
              <Trash2 size={14} aria-hidden="true" /> Delete task
            </button>
          </div>
        )}
      </div>
    </article>
  )
}

export default TaskCard
