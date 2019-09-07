import 'dotenv/config'

import express from 'express'
import http from 'http'
import cors from 'cors'
import socketIO from 'socket.io'
import routes from './routes'

import './config/mongo'

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
  req.io = io

  next()
})

app.use(routes)

export default server
