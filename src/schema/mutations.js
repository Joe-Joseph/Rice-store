import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt
} from 'graphql';
import userType from '../types/userTypes';
import { roundType, productType } from '../types/roundTypes';
import { createUserFunction, loginUserFunction } from '../controllers/auth';
import userValidation from '../helpers/userValidation';
import {
  registerRoundResolver,
  addProductResolver,
  sellProductResolver
} from '../controllers/rounds';
import { roundValidation, productValidation } from '../helpers/roundValidation';
import { updateTransactionResolver, deleteTransactionResolver } from '../controllers/productTransactions';


const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: userType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args) {
        try {
          await userValidation.validate(args);
        } catch (err) {
          return err;
        }
        return createUserFunction(args);
      }
    },

    registerRound: {
      type: roundType,
      args: {
        carPlate: { type: new GraphQLNonNull(GraphQLString) },
        driverName: { type: new GraphQLNonNull(GraphQLString) }
      },

      async resolve(parent, args, req) {
        try {
          await roundValidation.validate(args);
        } catch (err) {
          return err;
        }
        return registerRoundResolver(args, req);
      }
    },

    loginUser: {
      type: userType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parent, args) {
        return loginUserFunction(args);
      }
    },

    registerProduct: {
      type: productType,
      args: {
        productName: { type: new GraphQLNonNull(GraphQLString) },
        bagSize: { type: new GraphQLNonNull(GraphQLInt) },
        addedQuantity: { type: new GraphQLNonNull(GraphQLInt) },
      },

      async resolve(parent, args, req) {
        try {
          await productValidation.validate(args);
        } catch (err) {
          return err;
        }
        return addProductResolver(args, req);
      }
    },

    sellProduct: {
      type: productType,
      args: {
        productName: { type: new GraphQLNonNull(GraphQLString) },
        bagSize: { type: new GraphQLNonNull(GraphQLInt) },
        oneBagCost: { type: new GraphQLNonNull(GraphQLInt) },
        soldQuantity: { type: new GraphQLNonNull(GraphQLInt) },
      },

      async resolve(parent, args, req) {
        try {
          await productValidation.validate(args);
        } catch (err) {
          return err;
        }
        return sellProductResolver(args, req);
      }
    },

    updateTransaction: {
      type: productType,
      args: {
        productName: { type: new GraphQLNonNull(GraphQLString) },
        bagSize: { type: new GraphQLNonNull(GraphQLInt) },
        transactionId: { type: new GraphQLNonNull(GraphQLInt) },
        addedQuantity: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args, req) {
        return updateTransactionResolver(args, req);
      }
    },

    deleteTransaction: {
      type: productType,
      args: {
        transactionId: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args, req) {
        return deleteTransactionResolver(args, req);
      }
    }
  }
});

export default Mutation;
