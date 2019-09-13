import path from 'path';
import graphqlHTTP from 'express-graphql';
import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const { ApolloServer, gql } = require('apollo-server');
const db = require('./helpers/db');

const port = process.env.PORT || 3001;
const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen(port)
    .then(({ url }:any) => console.log(`server running on ${url}`));
