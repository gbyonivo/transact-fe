import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';

import AccountListMenu from './components/accountListMenu';
import Summary from './components/summary';
import './index.scss';

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  // const token = localStorage.getItem(AUTH_TOKEN)
  // const authorizationHeader = token ? `Bearer ${token}` : null
  operation.setContext({
    headers: {
      authorization: 'jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwibmFtZSI6IlBoYXJhb2ggU2FsYWgiLCJpYXQiOjE1MjU4NzQ5OTN9.v080NJLEGh6LPhn_3snzMfMHoAw9GMmPhzdAtrjuPGk' // eslint-disable-line
    }
  });
  return forward(operation);
});

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

const link = middlewareAuthLink.concat(httpLink);

const cache = new InMemoryCache();
const client = new ApolloClient({
  link,
  cache,
});

ReactDOM.render(<ApolloProvider client={client}>
  <Router>
    <div>
      <Route path="/" component={AccountListMenu} />
      <Route path="/" component={Summary} />
    </div>
  </Router>
</ApolloProvider>, document.getElementById('index')); // eslint-disable-line
