import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';

const productType = new GraphQLObjectType({
  name: 'product',
  fields: () => ({
    productId: { type: GraphQLInt },
    storeId: { type: GraphQLInt },
    productName: { type: GraphQLString },
    productType: { type: GraphQLString },
    bagSize: { type: GraphQLString },
    quantity: { type: GraphQLString },
    totalBags: { type: GraphQLString },
    createdAt: { type: GraphQLString }
  })
});

export default productType;
