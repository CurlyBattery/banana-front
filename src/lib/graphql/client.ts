import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";
import {setClient} from "svelte-apollo";

function createApolloClient() {
    const link = new HttpLink({
        uri: "https://hasura.io/learn/graphql",
    });

    const cache = new InMemoryCache();
    const client = new ApolloClient({
        link,
        cache,
    });
    return client;
}

const client = createApolloClient();
setClient(client);