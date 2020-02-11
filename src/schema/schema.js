import { GraphQLSchema } from 'graphql';
import Mutation from './mutations';
import Query from './query';


export default new GraphQLSchema({
  query: Query,
  mutation: Mutation
});
