import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt
} from 'graphql';
import userType from '../types/userTypes';
import { roundType, productType } from '../types/roundTypes';
import { createUserFunction } from '../controllers/auth';
import userValidation from '../helpers/userValidation';
import {
  registerRoundResolver,
  addProductResolver,
  sellProductResolver
} from '../controllers/rounds';
import { roundValidation, productValidation } from '../helpers/roundValidation';


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
    }
  }
});

export default Mutation;
