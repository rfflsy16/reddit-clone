import Follow from "../models/follow.js"

const followTypeDefs = `#graphql
    type Follow {
        _id: ID
        followingId: ID
        followerId: ID
        createdAt: String
        updatedAt: String
    }
`
const followResolvers = {
    Query: {

    },
    Mutation: {

    }
}

export { followTypeDefs, followResolvers }