import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';


const { url } = await startStandaloneServer({
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);