import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Authorization from './pages/Authorization';

import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';

// Apollo Imports
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Authorization />}>
            <Route path='/' element={<Home/>} />  
            <Route path='/profile'>
              <Route path=':username' element={<Profile />} />
              <Route path='' element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </Router>  
    </ApolloProvider>
  );
}

export default App;
