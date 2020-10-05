import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';

const roundType = new GraphQLObjectType({
  name: 'round',
  fields: () => ({
    roundId: { type: GraphQLInt },
    carPlate: { type: GraphQLString },
    driverName: { type: GraphQLString },
    createdAt: { type: GraphQLString },
  })
});

const productType = new GraphQLObjectType({
  name: 'product',
  fields: () => ({
    transactionId: { type: GraphQLInt },
    roundId: { type: GraphQLInt },
    employee: { type: GraphQLString },
    productName: { type: GraphQLString },
    productType: { type: GraphQLString },
    bagSize: { type: GraphQLString },
    oneBagCost: { type: GraphQLString },
    addedQuantity: { type: GraphQLString },
    currentQuantity: { type: GraphQLString },
    totalBags: { type: GraphQLString },
    transactionType: { type: GraphQLString },
    totalCost: { type: GraphQLString },
    message: { type: GraphQLString },
    createdAt: { type: GraphQLString }
  })
});

export { roundType, productType };
