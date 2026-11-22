import { ClipboardList } from 'lucide-react'
import TaskCard from './TaskCard.jsx'

function TaskList({ tasks, onEdit, onDelete, onStatusChange, onCreate }) {
  if (!tasks.length) {
    return (
      <div className="empty-state">
        <span className="empty-icon"><ClipboardList size={23} aria-hidden="true" /></span>
        <h3>No tasks found</h3>
        <p>Try changing your filters, or add a new task to get started.</p>
        <button className="button button-quiet" type="button" onClick={onCreate}>Create a task</button>
      </div>
    )
  }

  return (
    <ul className="task-list" aria-label="Tasks">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskCard task={task} onEdit={onEdit} onDelete={onDelete} onStatusChange={onStatusChange} />
        </li>
      ))}
    </ul>
  )
}

export default TaskList
