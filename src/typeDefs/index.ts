import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { PitstopType } from "./pitstop";
import { Pitstop } from "./../models/pitstop";
import { GraphQLList } from "graphql/type/definition";
import { GraphQLInt, GraphQLID, GraphQLString } from "graphql/type/scalars";
import { firebaseAdmin } from "../helpers/firebase";
import { CommentType } from "./comment";
import { CommentModel } from "../models/comments";
import { addPitstopComment, addPitstopImage } from "../resolvers/pitstop";
import { UserType } from "./user";


export const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        pitstops: {
            name: 'Pitstops',
            type: new GraphQLList(PitstopType),
            async resolve() {
                return await Pitstop.find({});
            }
        },
        pitstop: {
            name: 'Pitstop',
            type: PitstopType,
            args: { 
                id:{ type: GraphQLID },
                token: { type: GraphQLString },
            },
            async resolve(parent, args, context, {rootValue}) {
                if(args.token) {
                    const valid = await firebaseAdmin.auth()
                        .verifyIdToken(args.token);

                    console.log('valid?', valid);
                }
                const pitstop = await Pitstop.findById(args.id);
                console.log('pitsop', pitstop);
                return pitstop;
            }
        },
        comments: {
            name: 'Comments',
            type: new GraphQLList(CommentType),
            async resolve() {
                return await CommentModel.find();
            }
        },
        users: {
            name: 'Users',
            type: new GraphQLList(UserType),
            async resolve() {
                const users = await firebaseAdmin
                    .auth()
                    .listUsers();
                return users.users;
            }
        },
        user: {
            name: 'User',
            type: UserType,
            args: {
                id: { type: GraphQLID }
            },
            async resolve(parent, args) {
                return await firebaseAdmin
                    .auth()
                    .getUser(args.id)
            }
        }
    }
});

export const RootMutations = new GraphQLObjectType({
    name:'mutations',
    fields: {
        pitstop: {
            name: 'Pitstop',
            type: PitstopType,
        },
        addPitstopComment: {
            name: 'addPitstopComment',
            type: CommentType,
            args: {
                token: { type: GraphQLString },
                linkedId: { type: GraphQLString },
                text: { type: GraphQLString },
            },
            resolve: addPitstopComment
        },
        addPitstopImage: {
            name: 'addPitstopImage',
            args: {
                linkedId: { type: GraphQLString },
                image: { type: GraphQLString }
            },
            type: new GraphQLList(GraphQLString),
            resolve: addPitstopImage
        }
    }
});

export const Schema = new GraphQLSchema({
    query: RootQuery,
    mutation:RootMutations
});
