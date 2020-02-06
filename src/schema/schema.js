import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLList,
} from 'graphql';
import model from '../models';

const { users } = model;

const userType = new GraphQLObjectType({
  name: 'user',
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  })
});

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
    }
  }
});

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
      resolve(args) {
        const user = {
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          password: args.password
        };
        return users.create(user);
      }
    }
  }
});

export default new GraphQLSchema({
  query: Query,
  mutation: Mutation
});
