const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const bodyParser = require('body-parser');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

// sockets
app.use((req, res, next) => {
	req.io = io;

	next();
});

// habilitar conexão de outros ips
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// carregar rotas
app.use(require('./routes'));

// porta
server.listen(3333);
