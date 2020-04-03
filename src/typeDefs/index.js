import { gql } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import path from 'path';

const basePath = path.join(path.dirname(__filename), 'schemas');

const root = importSchema(`${basePath}/root.gql`);
const user = importSchema(`${basePath}/user.gql`);
const serie = importSchema(`${basePath}/serie.gql`);

export default [
  gql`${root}`,
  gql`${user}`,
  gql`${serie}`,
];
