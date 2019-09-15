import path from 'path';
import graphqlHTTP from 'express-graphql';
import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import { ApolloServer } from "apollo-server";
import { authMiddleware } from "./middleware/auth";
import express from "express";
import { firebaseAdmin } from "./helpers/firebase";

const app = express();

const db = require('./helpers/db');

const port = process.env.PORT || 3001;
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:async ({req}) => {
        const auth = req.headers.authorization || '';
        const token = auth.replace('Bearer ', '');
        let user:any;
        try {
            user = await firebaseAdmin.auth().verifyIdToken(token);
        } catch(e) {
            user = false;
        }
        return {
            user
        };
    }
});

server.listen(port)
    .then(({ url }:any) => console.log(`server running on ${url}`));
