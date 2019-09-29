
const { gql } = require('apollo-server');

export const PitstopType = `
    type Pitstop {
        id: String
        name: String
        notes: String
        longitude: Float
        latitude: Float
        connection:Int
        comments: [Comment]
        images: [Image]
    }
`;

export const PitstopMutations = `
        addPitstop(
            name: String!
            notes: String!
            longitude: Float!
            latitude: Float!
            connection: Int!
        ): Pitstop
        addPitstopImage(
            id: ID!
            image: Upload!
        ): Pitstop
`;

