import { getPitstops, getPitstop, getPitstopComments, addPitstopImage, addPitstop, addPitstopComment } from "./pitstop";
import { getComments, getComment, getCommentUser } from "./comment";
import { addUser, getUsers } from "./user";
export const resolvers = {
    Query: {
        Pitstop: getPitstop,
        Pitstops: getPitstops,
        Comments: getComments,
        Comment: getComment,
        Users: getUsers
    },
    Mutation: {
        addPitstop: addPitstop,
        addPitstopImage: addPitstopImage,
        addUser: addUser,
        addPitstopComment: addPitstopComment
    },
    Pitstop: {
        comments: getPitstopComments,
    },
    Comment: {
        user: getCommentUser
    }
};
//# sourceMappingURL=index.js.map