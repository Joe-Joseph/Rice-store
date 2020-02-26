import express from 'express';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import schema from './schema/schema';
import formatError from './helpers/errorMessages';
import authenticateUser from './middleware/auth';

const app = express();
app.use(cors());

app.use(authenticateUser);

app.use('/', graphqlHTTP({
  schema,
  graphiql: true,
  customFormatErrorFn: (err) => formatError.getError(err)
}));

const PORT = process.env.PORT || 4000;

// eslint-disable-next-line no-console
app.listen(PORT, console.log(`App is running on ${PORT}`));

export default app;
