import axios from 'axios'
import 'dotenv/config'

const token = JSON.parse(localStorage.getItem('@session')).token

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { Authorization: 'Bearer ' + token },
})

export default api
