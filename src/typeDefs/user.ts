import { GraphQLObjectType } from "graphql";
import { GraphQLString, GraphQLID } from "graphql/type/scalars";

export const UserType = new GraphQLObjectType({
    name:'UserType',
    fields: {
        displayName: { type: GraphQLString },
        uid: { type: GraphQLID }
    }
});
