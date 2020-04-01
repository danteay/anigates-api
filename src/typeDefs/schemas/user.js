import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    me: User @auth
    user(id: ID!): User @auth
    users: [User!]! @auth
  }

  extend type Mutation {
    singUp(name: String!, email: String!, password: String!): User @guest
    singIn(email: String!, password: String!): User @guest
    singOut: Boolean @auth
  }

  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
  }
`;