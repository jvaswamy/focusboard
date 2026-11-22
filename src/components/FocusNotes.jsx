import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Circle, Sparkles } from 'lucide-react'

const notes = [
  {
    title: 'Make today count.',
    description: 'A little focus goes a long way.',
  },
  {
    title: 'One thing at a time.',
    description: 'Give your energy to what matters most.',
  },
  {
    title: 'Progress over perfect.',
    description: 'Small steps still move you forward.',
  },
]

function FocusNotes({ nextTask }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const note = notes[activeIndex]

  function showNote(index) {
    setActiveIndex((index + notes.length) % notes.length)
  }

  return (
    <section className="focus-banner" aria-label="Focus notes">
      <div className="focus-copy" aria-live="polite">
        <div className="focus-topline">
          <p className="focus-label"><Sparkles size={13} aria-hidden="true" /> FOCUS NOTES</p>
          <span className="focus-count">{String(activeIndex + 1).padStart(2, '0')} / 03</span>
        </div>
        <h2>{note.title}</h2>
        <p className="focus-description">{note.description}</p>
        <div className="focus-dots" role="group" aria-label="Choose a focus note">
          {notes.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={`focus-dot${activeIndex === index ? ' focus-dot-active' : ''}`}
              aria-label={`Show focus note ${index + 1}`}
              aria-pressed={activeIndex === index}
              onClick={() => showNote(index)}
            />
          ))}
        </div>
      </div>
      <div className="focus-side">
        <div className="next-task-card">
          {nextTask?.status === 'In progress'
            ? <Check className="next-task-icon" size={16} aria-hidden="true" />
            : <Circle className="next-task-icon" size={16} aria-hidden="true" />}
          <div className="next-task-copy">
            <p>NEXT UP</p>
            <strong>{nextTask?.title ?? 'You’re all caught up!'}</strong>
            {nextTask && <span>{nextTask.status}</span>}
          </div>
        </div>
        <div className="focus-arrows" aria-label="Focus note controls">
          <button type="button" className="focus-arrow" aria-label="Previous focus note" onClick={() => showNote(activeIndex - 1)}>
            <ArrowLeft size={17} aria-hidden="true" />
          </button>
          <button type="button" className="focus-arrow focus-arrow-next" aria-label="Next focus note" onClick={() => showNote(activeIndex + 1)}>
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default FocusNotes
