const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./graphql/schema');

const app = express();

// MongoDB connect
mongoose.connect('mongodb://localhost:27017/taskdb');
mongoose.connection.once('open', () => {
  console.log('Connected to database');
});

// GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000/graphql');
});
