import { GraphQLObjectType } from "graphql";
import { GraphQLString, GraphQLID } from "graphql/type/scalars";

export const UserType = `
    type User {
        displayName: String
        uid: String
    }
`;
