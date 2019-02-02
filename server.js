const express = require('express');
const http = require('http');
const path = require('path');
const api = require('./routes/api');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./middleware/jwt');

const busboy = require('connect-busboy');
const app = express();

const db = require('./helpers/db');

const port = process.env.PORT || 3001;

// app.use(jwt());
app.use(cors());
app.use(bodyParser.json({ limit: '10mb', extended: true }));

app.use(api);

const server = http.createServer(app);

server.listen(port, () => console.log('Running'));
