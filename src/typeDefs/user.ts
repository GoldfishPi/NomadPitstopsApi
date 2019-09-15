import { GraphQLObjectType } from "graphql";
import { GraphQLString, GraphQLID } from "graphql/type/scalars";

export const UserType = `
    type User {
        displayName: String
        id: ID
    }
`;

export const UserMutations = `
    addUser(
        email: String,
        uid: String
    ): Boolean
`;
