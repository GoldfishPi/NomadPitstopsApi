
import { Resolver } from "type-graphql/dist/decorators/Resolver";
import { Profile } from "../typeDefs/profile";
import { Query } from "type-graphql/dist/decorators/Query";
import { Ctx } from "type-graphql/dist/decorators/Ctx";
import { UserModel } from "../models/user";

@Resolver()
export class ProfileResolver {
    @Query(() => Profile, {nullable:true})
    async Profile(
        @Ctx(){user}:any,
    ) {
        if(!user)return;
        const userEntry = await UserModel.findOne({
            uid:user.uid
        });

        console.log('user lol', userEntry);
        if(!userEntry)return;
        return {
            user: userEntry,
            firstName:userEntry.get('firstName'), 
            lastName:userEntry.get('lastName'), 
            email:user.email, 
        }
    }
}
