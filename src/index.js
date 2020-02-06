import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema/schema';

const app = express();

app.use('/', graphqlHTTP({
  schema,
  graphiql: true
}));

const PORT = process.env.PORT || 4000;

// eslint-disable-next-line no-console
app.listen(PORT, console.log(`App is running on ${PORT}`));

export default app;
