import { CommentModel } from "./../models/comments";
import { firebaseAdmin } from "../helpers/firebase";
import { UserModel } from "../models/user";
import { Resolver } from "type-graphql/dist/decorators/Resolver";
import { Query } from "type-graphql/dist/decorators/Query";
import { CommentType } from "../typeDefs/comment";
import { Arg } from "type-graphql/dist/decorators/Arg";
import { User } from "../typeDefs/user";
import { FieldResolver } from "type-graphql/dist/decorators/FieldResolver";
import { Root } from "type-graphql/dist/decorators/Root";

@Resolver()
export class GlobalCommentResolver {
    @Query(() => [CommentType])
    async Comments() {
        return await CommentModel
            .find({
            }) 
            .sort({createdAt:'desc'})
    }
    
    @Query(() => CommentType)
    async Comment(
        @Arg('id')id:string
    ) {
        const comment =  await CommentModel
            .findById(id)
            .sort({createdAt:'desc'})
        return comment ? comment.toJSON() : comment;
    }

}

@Resolver(() => CommentType)
export class CommentResolver {
    @FieldResolver(() => User) 
    async user(
        @Root()comment:any
    ) {
        return await UserModel
            .findOne({ uid:comment.uid });
    }
}
