import { UserModel } from "../models/user";
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "../typeDefs/user";

@Resolver()
export class GlobalUserResolver {
    @Query(() => [User])
    async users() {
        return await UserModel.find({});
    }
    @Mutation(() => User)
    async addUser(
        @Arg('firstName') firstName:string,
        @Arg('lastName') lastName:string,
        @Arg('email') email:string,
        @Arg('username') username:string,
        @Arg('uid') uid:string,
    ) {
        try {
            await UserModel.create({
                firstName,
                lastName,
                email,
                username,
                uid,
            });
        } catch(e) {
            console.log('err', e);
            return false;
        }
        return true;
    }
}
