import { Maybe, TagEntity } from '../../types/gatsby-graphql';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export type Unwrap<T> = T extends Maybe<infer U> ? U : T;

export const exists = <T>(t: T | null | undefined): t is T => t != null;

export const isNonEmptyArray = <T>(
  array: (T | null | undefined)[] | null | undefined,
): array is T[] => (array || []).filter(exists).length > 0;

export const pickBadgeName = (
  tag: TagEntity,
  abbrFirst: boolean = false,
): string => (exists(tag.abbr) && abbrFirst ? tag.abbr ?? '' : tag.name ?? '');

export const lineClamp = (count: string | (number | string[])) => ({
  whiteSpace: 'pre-wrap',
  overflow: 'hidden',
  display: '-webkit-box',
  '-webkit-box-orient': 'vertical',
  '-webkit-line-clamp': count,
});

export const calculatedWidth = (tags: TagEntity[]) =>
  tags.length / 10 <= 1 ? 2 : Math.ceil(tags.length / 10);

export const diffDaysInYears = (start: Date) => dayjs().from(start, true);
