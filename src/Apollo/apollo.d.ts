import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

declare global {
  interface Window {
    __APOLLO_CLIENT__: ApolloClient<NormalizedCacheObject>;
  }
}
