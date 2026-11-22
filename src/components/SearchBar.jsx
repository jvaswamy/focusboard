import { useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'

function SearchBar({ value, onChange }) {
  const inputRef = useRef(null)

  useEffect(() => {
    function focusSearch(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', focusSearch)
    return () => window.removeEventListener('keydown', focusSearch)
  }, [])

  return (
    <label className="search-field">
      <Search size={17} aria-hidden="true" />
      <span className="sr-only">Search tasks by title</span>
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search tasks..."
      />
      {value && (
        <button type="button" className="search-clear" aria-label="Clear search" onClick={() => onChange('')}>
          <X size={15} aria-hidden="true" />
        </button>
      )}
      {!value && <kbd aria-hidden="true">Ctrl/⌘ K</kbd>}
    </label>
  )
}

export default SearchBar
