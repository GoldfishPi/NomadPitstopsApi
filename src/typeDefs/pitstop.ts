
const { gql } = require('apollo-server');

export const PitstopType = `
    type Pitstop {
        id: String
        name: String
        notes: String
        longitude: Float
        latitude: Float
        comments: [Comment]
        images: [Image]
    }
`;

export const PitstopMutations = `
        addPitstop(
            title: String!
            description: String!
            wifi: Int!
            longitude: Float!
            latitude: Float!
        ): Pitstop
        addPitstopImage(
            id: ID!
            image: Upload!
        ): Pitstop
`;

