import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
} from 'graphql';
import model from '../models';
import userType from '../types/userTypes';
import { loginUserFunction } from '../controllers/auth';

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

  }
});

export default Query;
