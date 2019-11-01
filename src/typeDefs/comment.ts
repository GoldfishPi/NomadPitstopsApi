import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./user";
@ObjectType()
export class CommentType {
    @Field(() => ID)
    id:string;

    @Field(() => ID)
    uid:string;

    @Field(() => ID)
    linkedId:string;

    @Field(() => String)
    type:string;

    @Field(() => String)
    text:string;

    @Field(() => User)
    user: User

    @Field(() => Date)
    createdAt:Date
}
