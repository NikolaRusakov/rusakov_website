import { Maybe } from '../../types/gatsby-graphql';

export type Unwrap<T> = T extends Maybe<infer U> ? U : T;

export const exists = <T>(t: T | null | undefined): t is T => t != null;

export const isNonEmptyArray = <T>(
  array: (T | null | undefined)[] | null | undefined,
): array is T[] => (array || []).filter(exists).length > 0;
