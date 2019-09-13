import { GraphQLObjectType } from "graphql";
import { GraphQLString, GraphQLID, GraphQLFloat, GraphQLInt } from "graphql/type/scalars";
import { UserType } from "./user";
import { firebaseAdmin } from "../helpers/firebase";

export const CommentType = `
    type Comment {
        id:ID
        type:String
        uid:ID
        linkedId: ID
        text: String
        user:User
    }
`;
