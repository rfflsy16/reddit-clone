import User from "../models/user.js"

const userTypeDefs = `#graphql
    type User {
        _id: ID
        name: String
        username:String
        email:String
        password: String
    }

    type GeneralResponse {
        message: String
    }

    type LoginResponse {
        access_token: String
    }

    type GetUserByIdResponse {
            _id: ID!
        name: String
        username: String!
        email: String!
        Followings: [User]
        Followers: [User]
    }

    input GetUserByIdInput {
        userId: String
    }

    input SearchUserInput {
        keyword: String!
    }
    input RegisterInput {
        name: String
        username: String
        email: String
        password: String
    }

    input LoginInput {
        email: String
        password: String
    }

    type Query {
        getUserById(input: GetUserByIdInput): GetUserByIdResponse
        searchUsers(profile: SearchUserInput): User
        getProfile: GetUserByIdResponse
    }

    type Mutation {
        register(newUser: RegisterInput) : GeneralResponse
        login(user: LoginInput) : LoginResponse
    }
`

const userResolvers = {
    Query: {
        searchUsers: async (_, args, context) => {
            // console.log("masukkkk")
            const { keyword } = args.profile

            const search = await User.searchUsers({ keyword })

            return search
        },
        getUserById: async (_, args, context) => {
            // console.log("masukkk")

            await context.authenticate()
            const { userId } = args.input

            const getUser = await User.getUserById({ userId })
            return getUser
        },
        getProfile: async (_, args, context) => {
            try {
                const infoUser = await context.authenticate()

                // console.log(infoUser.userId, "<<<<<<<<<<<")

                const profile = await User.getProfile(infoUser)

                return profile
            } catch (error) {
                console.log(error)
            }
        }
    },

    Mutation: {
        login: async (_, args) => {
            const { email, password } = args.user
            const response = User.login({ email, password })

            return response
        },
        register: async (_, args) => {
            const { name, username, email, password } = args.newUser
            // console.log(email, 'mamang')
            const response = User.register({ name, username, email, password })

            return response
        }
    }
}

export { userTypeDefs, userResolvers }