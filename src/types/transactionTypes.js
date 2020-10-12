import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';

const transactionType = new GraphQLObjectType({
  name: 'transaction',
  fields: () => ({
    transactionId: { type: GraphQLInt },
    productId: { type: GraphQLInt },
    productName: { type: GraphQLString },
    productType: { type: GraphQLString },
    employee: { type: GraphQLString },
    bagSize: { type: GraphQLString },
    oneBagCost: { type: GraphQLString },
    quantity: { type: GraphQLString },
    message: { type: GraphQLString },
    currentQuantity: { type: GraphQLString },
    totalBags: { type: GraphQLString },
    transactionType: { type: GraphQLString },
    totalCost: { type: GraphQLString },
    createdAt: { type: GraphQLString }
  })
});

export default transactionType;
