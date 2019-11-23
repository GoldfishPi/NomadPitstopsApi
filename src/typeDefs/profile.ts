
import { ObjectType, Field, ID } from "type-graphql"
import { User } from "./user";


@ObjectType()
export class Profile {
    @Field(() => User)
    user:User;

    @Field(() => String)
    firstName:string;

    @Field(() => String)
    lastName:string;

    @Field(() => String)
    email:string;
}

