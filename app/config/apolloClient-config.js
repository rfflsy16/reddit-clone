import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import * as SecureStore from 'expo-secure-store'

const httpLink = createHttpLink({
    uri: 'https://server-reddit.rafflesy.site/'
});

const authenticationLink = setContext(async (_, { headers }) => {
    const access_token = await SecureStore.getItemAsync("access_token")

    return {
        headers: {
            ...headers,
            authorization: access_token ? `Bearer ${access_token}` : '',
        }
    }
})

const client = new ApolloClient({
    link: authenticationLink.concat(httpLink),
    cache: new InMemoryCache()
})

export default client