const graphql = require('graphql');
const _ = require('lodash');
const Album = require('../models/album');
const Artist = require('../models/artist');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const AlbumType = new GraphQLObjectType({
  name: 'Album',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    artist: {
      type: ArtistType,
      resolve(parent, arg) {
        return Artist.findById(parent.artistId);
      },
    },
  }),
});

const ArtistType = new GraphQLObjectType({
  name: 'Artist',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    since: { type: GraphQLInt },
    albums: {
      type: new GraphQLList(AlbumType),
      resolve(parent, args) {
        return Album.find({ artistId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    album: {
      type: AlbumType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Album.findById(args.id);
      },
    },
    artist: {
      type: ArtistType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Artist.findById(args.id);
      },
    },
    albums: {
      type: new GraphQLList(AlbumType),
      resolve(parent, args) {
        return Album.find({});
      },
    },
    artists: {
      type: new GraphQLList(ArtistType),
      resolve(parent, sinces) {
        return Artist.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addArtist: {
      type: ArtistType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        since: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        let artist = new Artist({
          name: args.name,
          since: args.since,
        });
        return artist.save();
      },
    },
    addAlbum: {
      type: AlbumType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        artistId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let album = new Album({
          name: args.name,
          genre: args.genre,
          artistId: args.artistId,
        });

        return album.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
