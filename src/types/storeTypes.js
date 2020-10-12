import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';

const storeType = new GraphQLObjectType({
  name: 'store',
  fields: () => ({
    storeId: { type: GraphQLInt },
    storeLocation: { type: GraphQLString },
    userId: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
  })
});


export default storeType;
