import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { isNotAuthenticated } from './../hooks/auth';

export default class GuestDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, details) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = function (...args) {
      const [, , context] = args;
      isNotAuthenticated(context.req);
      return resolve.apply(this, args);
    };
  }
}