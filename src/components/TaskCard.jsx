import { CalendarDays, Check, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'

function formatDueDate(value) {
  if (!value) return 'No due date'
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function getDueHint(value, isCompleted) {
  if (isCompleted) return 'Completed'
  if (!value) return 'No due date'
  const [year, month, day] = value.split('-').map(Number)
  const due = new Date(year, month - 1, day)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const daysUntilDue = Math.round((due - today) / 86_400_000)
  if (daysUntilDue < 0) return 'Overdue'
  if (daysUntilDue === 0) return 'Due today'
  if (daysUntilDue <= 3) return 'Due soon'
  return 'Upcoming'
}

function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const isCompleted = task.status === 'Completed'

  return (
    <article className={`task-card${isCompleted ? ' task-completed' : ''}`}>
      <button
        type="button"
        className={`task-check${isCompleted ? ' task-check-done' : ''}`}
        aria-pressed={isCompleted}
        aria-label={isCompleted ? `Mark ${task.title} as to do` : `Mark ${task.title} as completed`}
        onClick={() => onStatusChange(task.id, isCompleted ? 'To do' : 'Completed')}
      >
        <span className="task-checkbox-box">
          {isCompleted && <Check size={13} strokeWidth={2.5} aria-hidden="true" />}
        </span>
      </button>
      <div className="task-main">
        <h3>{task.title}</h3>
        <p className="task-description">
          <span>{task.description || task.category}</span>
          <span className="task-due-hint"> · {getDueHint(task.dueDate, isCompleted)}</span>
        </p>
      </div>
      <div className="task-trailing">
        <span className={`category-tag category-${task.category.toLowerCase()}`}>{task.category}</span>
        <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
          <span />{task.priority}
        </span>
        <span className="task-due"><CalendarDays size={13} aria-hidden="true" />{formatDueDate(task.dueDate)}</span>
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
      </div>
    </article>
  )
}

export default TaskCard
