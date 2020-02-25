import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
} from 'graphql';
import model from '../models';
import userType from '../types/userTypes';
import { loginUserFunction, resetPassword } from '../controllers/auth';
import { getAllRoundsResolver } from '../controllers/rounds';
import { roundType, productType } from '../types/roundTypes';
import { getTransctionsByRoundResolver, getOneTransactionResolver } from '../controllers/productTransactions';

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

    passwordReset: {
      type: userType,
      args: {
        email: { type: GraphQLString }
      },
      resolve(parent, args) {
        return resetPassword(args);
      }
    },

    getAllRounds: {
      type: new GraphQLList(roundType),
      resolve(parent, args, req) {
        return getAllRoundsResolver(req);
      }
    },

    getTransactionsByRound: {
      type: new GraphQLList(productType),
      resolve(parent, args, req) {
        return getTransctionsByRoundResolver(args, req);
      }
    },

    getOneTransaction: {
      type: productType,
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
