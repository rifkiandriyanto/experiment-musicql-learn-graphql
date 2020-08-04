import { gql } from "apollo-boost";

const getAlbumsQuery = gql`
	{
		albums {
			name
			id
		}
	}
`;

const getArtistsQuery = gql`
	{
		artists {
			name
			id
		}
	}
`;

const addAlbumMutation = gql`
	mutation($name: String!, $genre: String!, $artistId: ID!) {
		addAlbum(name: $name, genre: $genre, artistId: $artistId) {
			name
			id
		}
	}
`;

const getAlbumQuery = gql`
	query($id: ID) {
		album(id: $id) {
			id
			name
			genre
			artist {
				id
				name
				since
				albums {
					name
					id
				}
			}
		}
	}
`;

export { getAlbumsQuery, getArtistsQuery, addAlbumMutation, getAlbumQuery };
