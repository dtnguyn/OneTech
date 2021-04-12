import { withApollo as createWithApollo } from "next-apollo";

import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const uploadLink = createUploadLink({
  uri: `${process.env.NEXT_PUBLIC_SERVER_URL}/graphql`, // Apollo Server is served from port 4000
  credentials: "include",
});

export const client = new ApolloClient({
  // uri: `${process.env.NEXT_PUBLIC_SERVER_URL}/graphql`,
  link: uploadLink as any,
  // credentials: "include",
  cache: new InMemoryCache(),
  ssrMode: true,
});

export const withApollo = createWithApollo(client);
