import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAlbumQuery } from '../queries/queries';

class AlbumDetails extends Component {
  displayAlbumDetails() {
    const { album } = this.props.data;

    if (album) {
      return (
        <div>
          <h2>{album.name}</h2>
          <p>
            <b>genre: </b>
            {album.genre}
          </p>
          <p>
            <b>Artist: </b>
            {album.artist.name}
          </p>
          <b>
            <i>All albums by this artist</i>
          </b>
          <ul className='other-albums album-list'>
            {album.artist.albums.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No album selected.</div>;
    }
  }
  render() {
    return <div id='album-details'>{this.displayAlbumDetails()}</div>;
  }
}

export default graphql(getAlbumQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.albumId,
      },
    };
  },
})(AlbumDetails);
