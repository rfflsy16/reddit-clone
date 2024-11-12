import User from "../models/user"

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
        login(user: LoginInput) : LoginResponse
        getProfile: User
    }

    type Mutation {
        register(newUser: RegisterInput) : GeneralResponse
    }
`

const userResolvers = {
    Query: {
        login: async (_, args) => {
            const { email, password } = args.user
            const response = User.login({ email, password })

            return response
        },
        getProfile: async (_, args, context) => {
            const { user } = await context.authentication()

            return user
        }
    }
}