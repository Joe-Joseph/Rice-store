import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt
} from 'graphql';
import userType from '../types/userTypes';
import { roundType } from '../types/roundTypes';
import storeType from '../types/storeTypes';
import transactionType from '../types/transactionTypes';
import productType from '../types/productTypes';
import { createUserFunction, loginUserFunction } from '../controllers/auth';
import userValidation from '../helpers/userValidation';
import { registerRoundResolver } from '../controllers/rounds';
import { createStoreResolver } from '../controllers/store';
import { registerProduct } from '../controllers/product';
import {
  roundValidation,
  productValidation,
  storeValidation
} from '../helpers/roundValidation';
import {
  updateTransactionResolver,
  deleteTransactionResolver,
  addProductResolver,
  sellProductResolver,
  deleteOneTransactionResolver
} from '../controllers/transactions';


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

    createStore: {
      type: storeType,
      args: {
        storeLocation: { type: new GraphQLNonNull(GraphQLString) },
      },

      async resolve(parent, args, req) {
        try {
          await storeValidation.validate(args);
        } catch (err) {
          return err;
        }
        return createStoreResolver(args, req);
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
      type: transactionType,
      args: {
        productName: { type: new GraphQLNonNull(GraphQLString) },
        productType: { type: GraphQLString },
        bagSize: { type: GraphQLInt },
        quantity: { type: new GraphQLNonNull(GraphQLInt) },
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

    createProduct: {
      type: productType,
      args: {
        productName: { type: new GraphQLNonNull(GraphQLString) },
        productType: { type: new GraphQLNonNull(GraphQLString) },
        bagSize: { type: new GraphQLNonNull(GraphQLInt) },
      },

      async resolve(parent, args, req) {
        try {
          await productValidation.validate(args);
        } catch (err) {
          return err;
        }
        return registerProduct(args, req);
      }
    },

    sellProduct: {
      type: transactionType,
      args: {
        productName: { type: new GraphQLNonNull(GraphQLString) },
        productType: { type: new GraphQLNonNull(GraphQLString) },
        bagSize: { type: new GraphQLNonNull(GraphQLInt) },
        oneBagCost: { type: new GraphQLNonNull(GraphQLInt) },
        quantity: { type: new GraphQLNonNull(GraphQLInt) },
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
      type: transactionType,
      args: {
        transactionId: { type: new GraphQLNonNull(GraphQLInt) },
        quantity: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args, req) {
        return updateTransactionResolver(args, req);
      }
    },

    deleteOneTransaction: {
      type: transactionType,
      args: {
        transactionId: { type: GraphQLInt },
      },
      resolve(parent, args, req) {
        return deleteOneTransactionResolver(args, req);
      }
    },

    deleteTransaction: {
      type: transactionType,
      resolve(parent, args, req) {
        return deleteTransactionResolver(req);
      }
    }
  }
});

export default Mutation;
