import { useEffect, useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const storedValue = window.localStorage.getItem(key)
      if (storedValue === null) return { value: initialValue, error: null }
      const parsedValue = JSON.parse(storedValue)
      if (!Array.isArray(parsedValue)) {
        return { value: initialValue, error: 'Saved tasks could not be read. Existing data was left unchanged.' }
      }
      return { value: parsedValue, error: null }
    } catch {
      return { value: initialValue, error: 'Local storage is unavailable. Your changes may not be saved.' }
    }
  })

  useEffect(() => {
    if (state.error) return
    try {
      window.localStorage.setItem(key, JSON.stringify(state.value))
    } catch {
      setState((current) => ({
        ...current,
        error: 'Could not save your tasks to this browser. Check your storage settings.',
      }))
    }
  }, [key, state])

  function setValue(nextValue) {
    setState((current) => ({
      ...current,
      value: typeof nextValue === 'function' ? nextValue(current.value) : nextValue,
    }))
  }

  return [state.value, setValue, state.error]
}
