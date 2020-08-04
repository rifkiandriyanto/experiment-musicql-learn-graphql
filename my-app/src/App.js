import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import AlbumList from './components/album/AlbumList';
import AddAlbum from './components/album/AddAlbum';
import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
        <AddAlbum />
        <AlbumList />
    </ApolloProvider>
  );
}

export default App;
