import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core"
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries"
import sha256 from "js-sha256"

const sha256Typed = sha256 as unknown as (data: string | Buffer) => string

const persistedQueriesLink = createPersistedQueryLink({
  sha256: sha256Typed,
}).concat(new HttpLink({ uri: "https://graph.rockstargames.com" }))

const apolloClient = new ApolloClient({
  link: persistedQueriesLink,
  cache: new InMemoryCache(),
})

export default apolloClient
