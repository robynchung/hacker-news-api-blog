import { ApolloClient, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

const client = new ApolloClient({
  link: new RestLink({ uri: "http://localhost:3000/" }),
  cache: new InMemoryCache()
});

console.log(client.link);

export default { client };
