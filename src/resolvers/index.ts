import { getPitstops, getPitstop, getPitstopComments, getPitstopImages, addPitstopImage, addPitstop, addPitstopComment } from "./pitstop";
import { getComments,getComment, getCommentUser } from "./comment";
import { addUser } from "./user";
export const resolvers = {
    Query: {
        Pitstop: getPitstop,
        Pitstops: getPitstops,
        Comments: getComments,
        Comment: getComment,
    },
    Mutation: {
        addPitstop: addPitstop,
        addPitstopImage: addPitstopImage,
        addUser: addUser,
        addPitstopComment:addPitstopComment
    },
    Pitstop: {
        comments: getPitstopComments,
    },
    Comment: {
        user: getCommentUser
    }
}
