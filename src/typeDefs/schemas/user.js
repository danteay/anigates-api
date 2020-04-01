import {gql} from 'apollo-server-express';

export default gql`
  extend type Query {
    me: User
    user(id: ID!): User
    users: [User!]!
  }

  extend type Mutation {
    singUp(name: String!, email: String!, password: String!): User
    singIn(email: String!, password: String!): User
    singOut: Boolean
  }

  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
  }
`;