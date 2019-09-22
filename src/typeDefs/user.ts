import { GraphQLObjectType } from "graphql";
import { GraphQLString, GraphQLID } from "graphql/type/scalars";

export const UserType = `
    type User {
        username: String
        id: ID
    }
`;

export const UserMutations = `
    addUser(
        email: String!
        uid: String!
        firstName: String!
        lastName: String!
        username:String!
    ): Boolean
`;
