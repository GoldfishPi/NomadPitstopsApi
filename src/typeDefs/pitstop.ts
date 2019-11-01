import { ObjectType, Field, ID, Float, Int } from "type-graphql";
import { CommentType } from "./comment";
import { ImageType } from "./image";

@ObjectType()
export class Pitstop {
    @Field(() => ID)
    id:string;
    
    @Field(() => String)
    name:string;

    @Field(() => String)
    notes:string;

    @Field(() =>  Float)
    longitude:string;

    @Field(() =>  Float)
    latitude:number;

    @Field(() =>  Int)
    connection:number;

    @Field(() => [CommentType])
    comments: CommentType[]

    @Field(() => [ImageType])
    images: ImageType[]
}
