

const typeDefs = `#graphql
    type User {
        _id : ID
        name: String
        username:String
        email:String
        password: String
    }

    type Response {
        message: String
        _id : ID
        name: String
        username:String
        email:String
        password: String
    }
`