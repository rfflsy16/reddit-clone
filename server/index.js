import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { userResolvers, userTypeDefs } from "./schemas/userSchema.js";

import 'dotenv/config'

console.log(process.env.SECRET_KEY)

const server = new ApolloServer({
    typeDefs: userTypeDefs,
    resolvers: userResolvers
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);