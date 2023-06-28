import { useState, useRef } from 'react'
import { Toggleable } from './Togglable'

export function NoteForm ({ onAddNote, onLogout }) {
  const [newNote, setNewNote] = useState('')
  const toggleableRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    const newNoteAdded = {
      content: newNote,
      important: false
    }

    onAddNote(newNoteAdded)
    toggleableRef.current.toggleVisibility()
  }
  return (
    <>
      <Toggleable buttonText='New Note' ref={toggleableRef}>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            onChange={({ target }) => setNewNote(target.value)}
            value={newNote}
            placeholder='Write a new note'
          />
          <button>Create Note</button>
        </form>
      </Toggleable>

      <div style={{ paddingTop: '10px' }}>
        <button onClick={onLogout}>Log out</button>
      </div>
    </>
  )
}
