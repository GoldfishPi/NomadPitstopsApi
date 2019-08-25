import { GraphQLObjectType } from "graphql";
import { GraphQLString, GraphQLID, GraphQLFloat, GraphQLInt } from "graphql/type/scalars";
import { UserType } from "./user";
import { firebaseAdmin } from "../helpers/firebase";

export const CommentType = new GraphQLObjectType({
    name:'CommentType',
    fields: {
        type:{ type: GraphQLString},
        uid:{ type: GraphQLID},
        linkedId: { type: GraphQLID },
        text: {type: GraphQLString },
        user: {
            name: 'User',
            type: UserType,
            async resolve(parent) {
                return firebaseAdmin
                    .auth()
                    .getUser(parent.uid)
            }
        }
    }
});
