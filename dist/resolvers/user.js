var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserModel } from "../models/user";
import { Resolver } from "type-graphql";
import { UserSchema } from "../typeDefs/user";
let UserResolver = class UserResolver {
};
UserResolver = __decorate([
    Resolver(() => UserSchema)
], UserResolver);
export { UserResolver };
export const getUsers = () => __awaiter(this, void 0, void 0, function* () {
    return yield UserModel.find({});
});
export const addUser = (parent, { email, uid, firstName, lastName, username }) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield UserModel.create({
            firstName,
            lastName,
            email,
            username,
            uid,
        });
    }
    catch (e) {
        console.log('err', e);
        return false;
    }
    return true;
});
//# sourceMappingURL=user.js.map