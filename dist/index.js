var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "reflect-metadata";
import express from "express";
import { buildSchema } from "type-graphql/dist/utils/buildSchema";
import { UserResolver } from "./resolvers/user";
import { ApolloServer } from "apollo-server";
const app = express();
const db = require('./helpers/db');
const port = process.env.PORT || 3001;
export const bootstrap = () => __awaiter(this, void 0, void 0, function* () {
    const schema = yield buildSchema({
        resolvers: [UserResolver],
        emitSchemaFile: true
    });
    const server = new ApolloServer({});
    server.listen(port)
        .then(({ url }) => console.log(`server running on ${url}`));
});
bootstrap();
//# sourceMappingURL=index.js.map