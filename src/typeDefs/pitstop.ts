
const { gql } = require('apollo-server');

export const PitstopType = `
    type Pitstop {
        id: String
        name: String
        notes: String
        longitude: Float
        latitude: Float
        comments: [Comment]
        images: [String]
    }
`;

