import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { isAuthenticated } from '../hooks/auth';

export default class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, details) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = function (...args) {
      const [, , context] = args;
      isAuthenticated(context.req);
      return resolve.apply(this, args);
    };
  }
}
