import axios from 'axios'
import 'dotenv/config'

let api = null

if (localStorage.getItem('@session') !== null) {
  const token = JSON.parse(localStorage.getItem('@session')).token

  api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { Authorization: 'Bearer ' + token },
  })
} else {
  api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  })
}

export default api
