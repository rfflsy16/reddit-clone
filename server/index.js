import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { userResolvers, userTypeDefs } from "./schemas/userSchema.js";

import 'dotenv/config'
import authentication from "./middlewares/authentication.js";
import { postResolvers, postTypeDefs } from "./schemas/postSchema.js";

// console.log(process.env.SECRET_KEY)

const server = new ApolloServer({
    typeDefs: [userTypeDefs, postTypeDefs],
    resolvers: [userResolvers, postResolvers]
})

const { url } = await startStandaloneServer(server, {
    context: async ({ req, res }) => {
        return {
            authenticate: async () => authentication(req)
        };
    },
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);