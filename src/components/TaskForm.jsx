import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

function getTomorrow() {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  return new Date(date.getTime() - date.getTimezoneOffset() * 60_000).toISOString().slice(0, 10)
}

function TaskForm({ task, onSave, onClose }) {
  const titleRef = useRef(null)
  const [form, setForm] = useState(() => ({
    title: task?.title ?? '',
    description: task?.description ?? '',
    status: task?.status ?? 'To do',
    priority: task?.priority ?? 'Medium',
    dueDate: task?.dueDate ?? getTomorrow(),
    category: task?.category ?? 'Personal',
  }))

  useEffect(() => {
    titleRef.current?.focus()
  }, [onClose])

  function handleDialogKeyDown(event) {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }
    if (event.key !== 'Tab') return

    const focusable = [...event.currentTarget.querySelectorAll(
      'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])',
    )]
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first?.focus()
    }
  }

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSave({ ...form, title: form.title.trim(), description: form.description.trim() })
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section
        className="task-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-dialog-title"
        onKeyDown={handleDialogKeyDown}
      >
        <div className="dialog-heading">
          <div>
            <p className="eyebrow">{task ? 'MAKE IT YOURS' : 'ONE THING AT A TIME'}</p>
            <h2 id="task-dialog-title">{task ? 'Edit task' : 'Create a task'}</h2>
          </div>
          <button className="icon-button dialog-close" type="button" aria-label="Close task form" onClick={onClose}>
            <X size={19} aria-hidden="true" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="form-field">
            <span>Task title <span className="required-mark">*</span></span>
            <input ref={titleRef} name="title" value={form.title} onChange={updateField} maxLength="100" placeholder="What needs your attention?" required />
          </label>
          <label className="form-field">
            <span>Description <span className="field-optional">Optional</span></span>
            <textarea name="description" value={form.description} onChange={updateField} rows="3" maxLength="500" placeholder="Add a few details to help you get started..." />
          </label>
          <div className="form-grid">
            <label className="form-field">
              <span>Status</span>
              <select name="status" value={form.status} onChange={updateField}>
                <option>To do</option><option>In progress</option><option>Completed</option>
              </select>
            </label>
            <label className="form-field">
              <span>Priority</span>
              <select name="priority" value={form.priority} onChange={updateField}>
                <option>Low</option><option>Medium</option><option>High</option>
              </select>
            </label>
          </div>
          <div className="form-grid">
            <label className="form-field">
              <span>Due date</span>
              <input name="dueDate" type="date" value={form.dueDate} onChange={updateField} />
            </label>
            <label className="form-field">
              <span>Category</span>
              <input name="category" value={form.category} onChange={updateField} maxLength="24" placeholder="Personal" />
            </label>
          </div>
          <div className="dialog-actions">
            <button className="button button-quiet" type="button" onClick={onClose}>Cancel</button>
            <button className="button button-primary" type="submit">{task ? 'Save changes' : 'Create task'}</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default TaskForm
