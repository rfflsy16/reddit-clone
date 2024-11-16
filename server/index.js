import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { userResolvers, userTypeDefs } from "./schemas/userSchema.js";

import 'dotenv/config'
import authentication from "./middlewares/authentication.js";
import { postResolvers, postTypeDefs } from "./schemas/postSchema.js";
import { followResolvers, followTypeDefs } from "./schemas/followSchema.js";

// console.log(process.env.SECRET_KEY)


const server = new ApolloServer({
    typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
    resolvers: [userResolvers, postResolvers, followResolvers],
    introspection: true
})

const { url } = await startStandaloneServer(server, {
    context: async ({ req, res }) => {
        return {
            authenticate: async () => authentication(req)
        };
    },
    listen: { port: process.env.PORT || 4000 },
});

console.log(`🚀  Server ready at: ${url}`);