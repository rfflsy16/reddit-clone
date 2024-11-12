

const typeDefs = `#graphql
    type User {
        _id : ID
        username:String
        email:String
        password: String
    }

    type GeneralResponse {
        message: String
    }

    type Query {
        
    }
`