import React, { Component } from "react";
import { compose, graphql } from 'react-apollo'
import {
	getArtistsQuery,
	addAlbumMutation,
	getAlbumsQuery
} from "../queries/queries";

class AddAlbum extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			genre: "",
			artistId: ""
		};
	}

	displayArtists() {
		var data = this.props.getArtistsQuery;

		if (data.loading) {
			return <option disabled>Loading Artists...</option>;
		} else {
			return data.artists.map(artist => {
				return (
					<option key={artist.id} value={artist.id}>
						{artist.name}
					</option>
				);
			});
		}
	}

	submitForm(e) {
		e.preventDefault();
		this.props.addAlbumMutation({
			variables: {
				name: this.state.name,
				genre: this.state.genre,
				artistId: this.state.artistId
			},
			refetchQueries: [{ query: getAlbumsQuery }]
		});
	}

	render() {
		return (
			<form id="add-album" onSubmit={this.submitForm.bind(this)}>
				<div className="field">
					<label>Album name:</label>
					<input
						type="text"
						onChange={e => this.setState({ name: e.target.value })}
					/>
				</div>
				<div className="field">
					<label>Genre:</label>
					<input
						type="text"
						onChange={e => this.setState({ genre: e.target.value })}
					/>
				</div>
				<div className="field">
					<label>Artist:</label>
					<select
						onChange={e =>
							this.setState({ artistId: e.target.value })
						}
					>
						<option>Select artist</option>
						{this.displayArtists()}
					</select>
				</div>
				<div className="submit">
					<button>Add New Album</button>
				</div>
			</form>
		);
	}
}

export default compose (
	graphql(getArtistsQuery, { name: "getArtistsQuery" }),
	graphql(addAlbumMutation, { name: "addAlbumMutation" })
)(AddAlbum);
