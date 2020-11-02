import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
} from 'graphql';
import model from '../models';
import userType from '../types/userTypes';
import { resetPassword } from '../controllers/auth';
import transactionType from '../types/transactionTypes';
import {
  getAllTransactionsResolver,
  getOneTransactionResolver
} from '../controllers/transactions';
import { getAllProductsResolver } from '../controllers/product';
import productType from '../types/productTypes';

const { users } = model;

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      args: { id: { type: GraphQLInt } },
      resolve(args) {
        return users.findByPk(args.id);
      }
    },

    users: {
      type: new GraphQLList(userType),
      resolve() {
        return users.findAll({});
      }
    },

    passwordReset: {
      type: userType,
      args: {
        email: { type: GraphQLString }
      },
      resolve(parent, args) {
        return resetPassword(args);
      }
    },

    getAllTransactions: {
      type: new GraphQLList(transactionType),
      async resolve(parent, args, req) {
        await getAllTransactionsResolver(args, req);
        return getAllTransactionsResolver(args, req);
      }
    },

    getAllProducts: {
      type: new GraphQLList(productType),
      resolve(parent, args, req) {
        return getAllProductsResolver(args, req);
      }
    },

    getOneTransaction: {
      type: transactionType,
      args: {
        transactionId: { type: GraphQLInt }
      },
      resolve(parent, args, req) {
        return getOneTransactionResolver(args, req);
      }

    }

  }
});

export default Query;
