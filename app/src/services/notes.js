const baseUrl = '/api/notes'

let token = null

export const getAllNotes = () => {
  return fetch(baseUrl)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      return data
    })
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
    .then(res => res.json())
    .then(json => json)
    .catch(err => Promise.reject(err))
}

export const setToken = newToken => {
  token = `Bearer ${newToken}`
}
