const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./src/schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

mongoose.connect(
  '########## Your MongoDB Setting ##########',
  { useNewUrlParser: true}
);
mongoose.connection.once('open', () => {
  console.log('Database Connected');
});

app.use(cors());
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));
app.listen(4000, () => {
  console.log('Now Listing for requests on port 4000');
});
