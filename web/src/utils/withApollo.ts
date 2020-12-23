import { withApollo as createWithApollo } from "next-apollo";

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
  cache: new InMemoryCache(),
  ssrMode: true,
});

export const withApollo = createWithApollo(client);