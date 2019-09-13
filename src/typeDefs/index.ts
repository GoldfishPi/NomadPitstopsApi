import { PitstopType } from "./pitstop";
import { CommentType } from "./comment";
import { UserType } from "./user";

const { gql } = require('apollo-server');

export const typeDefs = gql`
    ${UserType}
    ${CommentType}
    ${PitstopType}
    type Query {
        Pitstop(id:ID!): Pitstop
        Pitstops:[Pitstop]
        Comments: [Comment]
        Comment(id:ID!): Comment
    }
    type Mutation {
        addPitstop(
            title: String!
            description: String!
            wifi: Int!
            longitude: Float!
            latitude: Float!
        ): Pitstop
        addPitstopImage(
            id: ID!
            image: Upload!
        ): Pitstop
    }
`;
