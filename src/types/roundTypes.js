import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';

const roundType = new GraphQLObjectType({
  name: 'round',
  fields: () => ({
    roundId: { type: GraphQLInt },
    carPlate: { type: GraphQLString },
    driverName: { type: GraphQLString },
    employee: { type: GraphQLString },
  })
});

const productType = new GraphQLObjectType({
  name: 'product',
  fields: () => ({
    roundId: { type: GraphQLInt },
    employee: { type: GraphQLString },
    productName: { type: GraphQLString },
    bagSize: { type: GraphQLString },
    oneBagCost: { type: GraphQLString },
    addedQuantity: { type: GraphQLString },
    soldQuantity: { type: GraphQLString },
    currentQuantity: { type: GraphQLString },
    totalBags: { type: GraphQLString },
    transactionType: { type: GraphQLString },
    totalCost: { type: GraphQLString },
    message: { type: GraphQLString }
  })
});

export { roundType, productType };
