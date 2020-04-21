import * as t from 'io-ts';

export const SectionUnion = t.union([
  t.literal('fe'),
  t.literal('be'),
  t.literal('sls'),
  t.literal('other'),
  t.literal('devops'),
  t.literal('dx'),
]);

export const Section = t.type({
  section: SectionUnion,
  tags: t.array(t.union([t.array(t.string), t.string])),
});

export const Companies = t.type({
  shortKey: t.string,
  sections: t.array(Section),
});

export const LocalCompanies = t.array(Companies);
export type LocalCompanies = t.TypeOf<typeof LocalCompanies>;

export type TagEntity = {
  key: string;
  name: string;
  count: string;
  heading: string;
};

export const isTagEntity = (
  tag: string | TagEntity | { key: string; name: string },
): tag is TagEntity => typeof tag !== 'string';
