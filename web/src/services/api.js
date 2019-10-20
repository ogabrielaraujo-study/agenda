import axios from 'axios'
import 'dotenv/config'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

let token =
  localStorage.getItem('@session') !== null
    ? JSON.parse(localStorage.getItem('@session')).token
    : null

if (token) {
  api.defaults.headers.Authorization = `Bearer ${token}`
}

export default api
