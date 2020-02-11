import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

const userType = new GraphQLObjectType({
  name: 'user',
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    token: { type: GraphQLString },
    message: { type: GraphQLString }
  })
});

export default userType;
