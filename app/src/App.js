import { useState, useEffect } from 'react'

import './App.css'

import { Note } from './components/Note'
import { createNote, getAllNotes, setToken } from './services/notes'
import { loginService } from './services/login'
import { Notification } from './components/Notification'
import { LoginForm } from './components/LoginForm'
import { NoteForm } from './components/NoteForm'

function App () {
  const [notes, setNotes] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    getAllNotes()
      .then(notes => {
        setNotes(notes)
      })
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const addNote = (note) => {
    const { token } = user
    createNote(note, token)
      .then(res => {
        setNotes(prevNotes => [...prevNotes, res])
      })
      .catch(err => {
        console.error(err)
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService({
        username,
        password
      })
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))

      setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setToken(null)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  const toggleImportant = (id) => {
    const note = notes.find(note => note.id === id)
    console.log(note)
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user
        ? <NoteForm onAddNote={addNote} onLogout={handleLogout} />

        : <LoginForm
            username={username}
            password={password}
            onUserNameChange={({ target }) => setUsername(target.value)}
            onPasswordChanged={({ target }) => setPassword(target.value)}
            onSubmitLogin={handleLogin}
          />}
      <ul>
        {
          notes.map((note) =>
            <Note
              key={note.id}
              note={note}
              onToggle={toggleImportant}
            />)
        }
      </ul>
    </div>
  )
}

export default App
