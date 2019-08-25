import express from 'express';
import http from 'http';
import path from 'path';
import api from './routes/api';
import fs from 'fs';
import bodyParser from 'body-parser';
import jwt from './middleware/jwt';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';
import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { Schema } from "./typeDefs";

const busboy = require('connect-busboy');
const app = express();

const db = require('./helpers/db');

const port = process.env.PORT || 3001;

// app.use(jwt());
app.use(cors());
app.use(bodyParser.json());

app.use(graphqlHTTP({
    schema: Schema,
    graphiql:true
}));

const server = http.createServer(app);

server.listen(port, () => console.log(`Server running on ${port}`));
