
import { ObjectType, Field, ID } from "type-graphql"

@ObjectType()
export class User {
    @Field(() => String)
    username:string;
    @Field(() => ID)
    id:string;
}

export const UserType = `
    type User {
        username: String
        id: ID
    }
`;

export const UserMutations = `
    addUser(
        email: String!
        uid: String!
        firstName: String!
        lastName: String!
        username:String!
    ): Boolean
`;
