import Follow from "../models/follow.js"

const followTypeDefs = `#graphql
    type Follow {
        _id: ID
        followingId: ID
        followerId: ID
        createdAt: String
        updatedAt: String
    }

    type ResponseFollow {
        message: String
    }
    input FollowInput {
        followingId: ID
    }

    type Mutation {
        followUser(input: FollowInput): ResponseFollow
    }
`
const followResolvers = {
    Mutation: {
        followUser: async (_, args, context) => {
            const infoUser = await context.authenticate()

            const { followingId } = args.input
            const follow = await Follow.addFollow({ followingId }, infoUser)

            return follow
        }
    }
}

export { followTypeDefs, followResolvers }