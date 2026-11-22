import { useMemo, useState } from 'react'
import { ArrowDownUp, Check, CircleCheck, CircleDashed, Clock3, Plus } from 'lucide-react'
import Sidebar from './components/Sidebar.jsx'
import Header from './components/Header.jsx'
import StatCard from './components/StatCard.jsx'
import FocusNotes from './components/FocusNotes.jsx'
import TaskList from './components/TaskList.jsx'
import TaskForm from './components/TaskForm.jsx'
import SearchBar from './components/SearchBar.jsx'
import FilterTabs from './components/FilterTabs.jsx'
import { sampleTasks } from './data/sampleTasks.js'
import { useLocalStorage } from './hooks/useLocalStorage.js'

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function App() {
  const [tasks, setTasks, storageError] = useLocalStorage('focusboard-tasks', sampleTasks)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All tasks')
  const [priorityFilter, setPriorityFilter] = useState('All priorities')
  const [activeNav, setActiveNav] = useState('Overview')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const stats = useMemo(() => {
    const total = tasks.length
    const inProgress = tasks.filter((task) => task.status === 'In progress').length
    const completed = tasks.filter((task) => task.status === 'Completed').length
    return {
      total,
      inProgress,
      completed,
      completion: total ? Math.round((completed / total) * 100) : 0,
    }
  }, [tasks])

  const visibleTasks = useMemo(() => {
    const query = search.trim().toLowerCase()
    return tasks.filter((task) => {
      const matchesSearch = !query || task.title.toLowerCase().includes(query)
      const matchesStatus = statusFilter === 'All tasks' || task.status === statusFilter
      const matchesPriority = priorityFilter === 'All priorities' || task.priority === priorityFilter
      const matchesNav = activeNav !== 'Today' || task.dueDate === getLocalDateString()
      return matchesSearch && matchesStatus && matchesPriority && matchesNav
    })
  }, [activeNav, priorityFilter, search, statusFilter, tasks])

  const nextTask = useMemo(() => tasks
    .filter((task) => task.status !== 'Completed')
    .sort((first, second) => (first.dueDate || '9999-12-31').localeCompare(second.dueDate || '9999-12-31'))[0] ?? null, [tasks])

  function openCreateForm() {
    setEditingTask(null)
    setIsFormOpen(true)
  }

  function saveTask(taskValues) {
    if (editingTask) {
      setTasks((currentTasks) => currentTasks.map((task) => (
        task.id === editingTask.id ? { ...task, ...taskValues } : task
      )))
    } else {
      const id = globalThis.crypto?.randomUUID?.() ?? `task-${Date.now()}`
      setTasks((currentTasks) => [{ ...taskValues, id }, ...currentTasks])
    }
    setIsFormOpen(false)
    setEditingTask(null)
  }

  function updateStatus(taskId, status) {
    setTasks((currentTasks) => currentTasks.map((task) => (
      task.id === taskId ? { ...task, status } : task
    )))
  }

  function deleteTask(task) {
    if (window.confirm(`Delete "${task.title}"? This can't be undone.`)) {
      setTasks((currentTasks) => currentTasks.filter((item) => item.id !== task.id))
    }
  }

  function navigateTo(page) {
    setActiveNav(page)
    setStatusFilter('All tasks')
    setSearch('')
    setIsSidebarOpen(false)
  }

  return (
    <div className="app-shell">
      {isSidebarOpen && (
        <button
          className="sidebar-backdrop"
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <Sidebar
        activeItem={activeNav}
        isOpen={isSidebarOpen}
        onNavigate={navigateTo}
        taskCount={stats.total}
      />
      <main className="main-panel">
        <Header currentPage={activeNav} onMenuToggle={() => setIsSidebarOpen((open) => !open)} />
        <div className="dashboard-content">
          {storageError && (
            <div className="storage-alert" role="status">{storageError}</div>
          )}
          <section className="welcome-row" aria-labelledby="welcome-title">
            <div>
              <h1 id="welcome-title">Your work, in focus.</h1>
              <p className="welcome-caption">Plan your day, stay organized, and celebrate small wins.</p>
            </div>
            <button className="button button-primary welcome-add" type="button" onClick={openCreateForm}>
              <Plus size={18} strokeWidth={2.2} aria-hidden="true" />
              <span>New task</span>
            </button>
          </section>

          <FocusNotes nextTask={nextTask} />

          <section className="stats-grid" aria-label="Task statistics">
            <StatCard
              label="Total tasks"
              value={stats.total}
              detail="Across all your projects"
              icon={ArrowDownUp}
              tone="lilac"
            />
            <StatCard
              label="In progress"
              value={stats.inProgress}
              detail="Keep the momentum"
              icon={Clock3}
              tone="peach"
            />
            <StatCard
              label="Completed"
              value={stats.completed}
              detail="Look at you go!"
              icon={CircleCheck}
              tone="mint"
            />
            <StatCard
              label="Completion"
              value={`${stats.completion}%`}
              detail="You’re making great progress"
              icon={Check}
              tone="blue"
              progress={stats.completion}
            />
          </section>

          <section className="work-area" aria-label="Tasks">
            <div className="tasks-panel">
              <div className="section-heading">
                <div>
                  <div className="heading-with-icon">
                    <CircleDashed size={19} aria-hidden="true" />
                    <h2>My tasks</h2>
                  </div>
                  <p className="section-subtitle">Make space for what matters.</p>
                </div>
                <button className="button button-quiet add-task-small" type="button" onClick={openCreateForm}>
                  <Plus size={16} aria-hidden="true" /> Add task
                </button>
              </div>
              <div className="task-tools">
                <SearchBar value={search} onChange={setSearch} />
                <label className="priority-filter">
                  <span className="sr-only">Filter by priority</span>
                  <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)}>
                    <option>All priorities</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </label>
              </div>
              <FilterTabs
                value={statusFilter}
                onChange={setStatusFilter}
                counts={{
                  'All tasks': stats.total,
                  'To do': tasks.filter((task) => task.status === 'To do').length,
                  'In progress': stats.inProgress,
                  Completed: stats.completed,
                }}
              />
              <TaskList
                tasks={visibleTasks}
                onEdit={(task) => {
                  setEditingTask(task)
                  setIsFormOpen(true)
                }}
                onDelete={deleteTask}
                onStatusChange={updateStatus}
                onCreate={openCreateForm}
              />
            </div>
          </section>
          <footer className="app-footer">Made for your best work, one day at a time <span aria-hidden="true">✦</span></footer>
        </div>
      </main>
      {isFormOpen && (
        <TaskForm
          task={editingTask}
          onSave={saveTask}
          onClose={() => {
            setIsFormOpen(false)
            setEditingTask(null)
          }}
        />
      )}
    </div>
  )
}

export default App
