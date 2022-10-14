import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Authorization from './pages/Authorization';

import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SingleReview from './pages/SingleReview';
import SingleReply from './pages/SingleReply';
import Notification from './pages/Notifications';

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
      Query: {
        fields: {
          User: {
            merge: true
          },
          Reviews: {
            merge: true
          }
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
              <Route path='notifications' element={<Notification />} />
            </Route>
            <Route path='/past/:id' element={<Home />} />
            <Route path='/review'>
              <Route path=':id' element={<SingleReview />} />
              <Route path=':id/:replyId' element={<SingleReply />} />
            </Route>
            
          </Route>
        </Routes>
      </Router>  
    </ApolloProvider>
  );
}

export default App;
