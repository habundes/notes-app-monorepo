const baseUrl = '/api/notes'

let token = null

export const getAllNotes = () => {
  return fetch(baseUrl)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`)
      }
      return res.json()
    })
    .then(data => {
      return data
    })
    .catch(err => console.error(err))
}

export const createNote = (note) => {
  return fetch(baseUrl, {
    method: 'POST',
    body: JSON.stringify(note),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `${token}`
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`)
      }
      return res.json()
    })
    .then(json => json)
    .catch(err => Promise.reject(err))
}

export const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export const updateNote = (note) => {
  return fetch(`${baseUrl}/${note.id}`, {
    method: 'PUT',
    body: JSON.stringify(note),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `${token}`
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`)
      }
      return res.json()
    })
    .then(json => json)
    .catch(err => Promise.reject(err))
}

export const deleteNote = (noteId) => {
  return fetch(`${baseUrl}/${noteId}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `${token}`
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`)
      }
      return null
    })
    .then(json => json)
    .catch(err => Promise.reject(err))
}
