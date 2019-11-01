import { Resolver, Query } from "type-graphql";

@Resolver()
export class Resolvers {
    @Query(() => String)
    test() {
        return 'hello world'
    }
}
