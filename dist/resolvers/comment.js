var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CommentModel } from "./../models/comments";
import { UserModel } from "../models/user";
export const getComments = () => __awaiter(this, void 0, void 0, function* () {
    return yield CommentModel
        .find({})
        .sort({ createdAt: 'desc' });
});
export const getComment = (parent, args, context) => __awaiter(this, void 0, void 0, function* () {
    return yield CommentModel
        .findById(args.id)
        .sort({ createdAt: 'desc' });
});
export const getCommentUser = (parent, args) => __awaiter(this, void 0, void 0, function* () {
    console.log('parent id', parent.uid);
    return yield UserModel
        .findOne({ uid: parent.uid });
});
//# sourceMappingURL=comment.js.map