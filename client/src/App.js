import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Authorization from './pages/Authorization';

import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SingleReview from './pages/SingleReview';

// Apollo Imports
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

let httpLink = null;

if(process.env.NODE_ENV === 'production'){
  httpLink = createHttpLink({
    uri: process.env.URI
  });
} else {
  httpLink = createHttpLink({
    uri: 'http://localhost:3001/graphql'
  });
}


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
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        liked: {
          merge: true
        }
      }
    }
  })
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
            <Route path='/past/:id' element={<Home />} />
            <Route path='/review/:id' element={<SingleReview />} />
          </Route>
        </Routes>
      </Router>  
    </ApolloProvider>
  );
}

export default App;
