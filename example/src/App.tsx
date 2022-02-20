import React from 'react'
//import * as Realm from "realm-web";
import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";
import { ExampleComponent } from 'gjm-stack'
import 'gjm-stack/dist/index.css'
const APP_ID = "application-0-mjiwa";
//https://ap-south-1.aws.realm.mongodb.com/api/client/v2.0/app/application-0-mjiwa/graphql
const graphqlUri = `https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`
console.log(graphqlUri);
// Local apps should use a local URI!
// const graphqlUri = `https://us-east-1.aws.stitch.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`
// const graphqlUri = `https://eu-west-1.aws.stitch.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`
// const graphqlUri = `https://ap-southeast-1.aws.stitch.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`
// const client1 = new ApolloClient({
//   link: new HttpLink({
//     uri: graphqlUri
//   }),
//   cache: new InMemoryCache(),
// });
const client = new ApolloClient({
  link: new HttpLink({
    uri: `https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`,
    // We define a custom fetch handler for the Apollo client that lets us authenticate GraphQL requests.
    // The function intercepts every Apollo HTTP request and adds an Authorization header with a valid
    // access token before sending the request.
    fetch: async (uri: string, options: RequestInit) => {
      //const accessToken = await getValidAccessToken();
      options.headers.Authorization = `Bearer 6211dd489ef63dce60bb324e`;
      return fetch(uri, options);
    },
  }),
  cache: new InMemoryCache()
});
// const client = ...

client
  .query({
    query: gql`
    query {
      task {
        _id
        _partition
        isComplete
        summary
      }
    }
    `
  })
  .then(result => console.log(result));


const App = () => {
  return <ExampleComponent text="Create React Library Example 😄" />
}

export default App
