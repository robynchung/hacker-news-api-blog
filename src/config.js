import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

import { api } from "./constants";

const client = new ApolloClient({
  link: new RestLink({ uri: api.hackerNews }),
  cache: new InMemoryCache()
});

const query = gql`
  query luke {
    person @rest(type: "Person", path: "people/1/") {
      name
    }
  }
`;

client.query({ query }).then(response => {
  console.log(response);
  // console.log(response.data.name);
});

export default { client };
