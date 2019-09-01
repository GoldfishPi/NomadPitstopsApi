import { GraphQLObjectType,  } from "graphql";
import { GraphQLString, GraphQLID, GraphQLFloat, GraphQLInt } from "graphql/type/scalars";
import { GraphQLList } from "graphql/type/definition";
import { CommentModel } from "../models/comments";
import { CommentType } from "./comment";
import { getPitstopImages } from './../resolvers/pitstop';

const PitstopMutations = new GraphQLObjectType({
    name:'Mutation',
    fields: {
    }
});

export const PitstopType = new GraphQLObjectType({
    name:'PitstopType',
    fields: {

        id: { type: GraphQLID },
        name: { type: GraphQLString },
        notes: { type: GraphQLString },
        longitude: { type: GraphQLFloat },
        latitude: { type: GraphQLFloat },
        comments: {
            name:'Comments',
            type: new GraphQLList(CommentType),
            async resolve(parent, args) {
                const comments = await CommentModel
                    .find({
                        type:'pitstop',
                        linkedId:parent.id
                    });
                return comments ? comments : [];
            }
        },
        images: {
            name:'Images',
            type: new GraphQLList(GraphQLString),
            resolve: getPitstopImages
        }
    
    },
});
