import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';
import userType from '../types/userTypes';
import { createUserFunction } from '../controllers/auth';
import userValidation from '../helpers/userValidation';


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
  }
});

export default Mutation;
