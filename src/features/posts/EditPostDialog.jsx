import { useRef, useState } from 'react'

export default function EditPostDialog({ text, onSave }) {
  const dialogRef = useRef(null)
  const [draft, setDraft] = useState(text)

  function openDialog() {
    setDraft(text)
    dialogRef.current.showModal()
  }

  function closeDialog() {
    dialogRef.current.close()
  }

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedText = draft.trim()
    if (!trimmedText) return

    onSave(trimmedText)
    closeDialog()
  }

  return (
    <>
      <button type="button" onClick={openDialog}>
        Изменить
      </button>

      <dialog
        ref={dialogRef}
        className="edit-dialog"
        aria-label="Редактирование поста"
      >
        <form className="edit-form" onSubmit={handleSubmit}>
          <textarea
            aria-label="Текст поста"
            rows={3}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />

          <div className="edit-actions">
            <button type="submit" disabled={!draft.trim()}>
              Подтвердить
            </button>
            <button
              className="button-danger"
              type="button"
              onClick={closeDialog}
            >
              Закрыть
            </button>
          </div>
        </form>
      </dialog>
    </>
  )
}