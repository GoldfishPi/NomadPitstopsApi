import { PitstopType,PitstopMutations } from "./pitstop";
import { CommentType } from "./comment";
import { UserType } from "./user";
import { ImageType } from "./image";

const { gql } = require('apollo-server');

export const typeDefs = gql`
    ${UserType}
    ${ImageType}
    ${CommentType}
    ${PitstopType}
    type Query {
        Pitstop(id:ID!): Pitstop
        Pitstops:[Pitstop]
        Comments: [Comment]
        Comment(id:ID!): Comment
    }
    type Mutation {
        ${PitstopMutations}
    }
`;
