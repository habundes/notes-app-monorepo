import axios from 'axios'

const baseUrl = '/api/login'

export const loginService = async (credentials) => {
  const { data } = await axios.post(baseUrl, credentials)
  return data

  // try {
  //  const response = await fetch(baseUrl, {
  //    method: 'POST',
  //    body: JSON.stringify(credentials),
  //    headers: {
  //      'Content-type': 'application/json; charset=UTF-8'
  //    }
  //  })
  //  const data = await response.json()
  //  if (response.ok) {
  //    return data
  //  } else {
  //    throw new Error('Invalid user')
  //  }
  // } catch (e) {
  //  console.error(e)
  // }
}
