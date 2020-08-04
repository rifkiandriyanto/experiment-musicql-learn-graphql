import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getAlbumsQuery } from "../queries/queries";

// components
import AlbumDetails from "./AlbumDetails";

class AlbumList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selected: null
		};
	}

	displayAlbums() {
		var data = this.props.data;

		if (data.loading) {
			return <div>Loading Albums...</div>;
		} else {
			return data.albums.map(album => {
				return (
					<li
						key={album.id}
						onClick={e => this.setState({ selected: album.id })}
					>
						{album.name}
					</li>
				);
			});
		}
	}

	render() {
		return (
			<div className="albums-listing">
				<div>
					<div className='title'>Best Indonesian Album's 2020 </div>
					<ul className="album-list">{this.displayAlbums()}</ul>
				</div>
				<AlbumDetails albumId={this.state.selected} />
			</div>
		);
	}
}

export default graphql(getAlbumsQuery)(AlbumList);
