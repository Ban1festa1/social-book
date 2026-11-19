import { useState } from 'react'

export default function TextEntryForm({ label, placeholder, onAdd }) {
  const [text, setText] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedText = text.trim()
    if (!trimmedText) return

    onAdd(trimmedText)
    setText('')
  }

  return (
    <form className="text-entry-form" onSubmit={handleSubmit}>
      <input
        type="text"
        aria-label={label}
        placeholder={placeholder}
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button type="submit">Добавить</button>
    </form>
  )
}