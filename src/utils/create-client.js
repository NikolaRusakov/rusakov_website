const GraphQLClient = require('graphql-request').GraphQLClient;
/**
 * Adopted from https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-shopify/src/lib.js
 * */
exports.createClient = (url, accessToken) => {
  if (accessToken == null) {
    return undefined;
  }
  return new GraphQLClient(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

exports.queryOnce = async (client, query, first = 50, after) =>
  await client.request(query, { first, after });

/*
export const queryAll = async (
  client,
  path,
  query,
  first = 250,
  after = null,
  aggregatedResponse = null,
) => {
  const data = await queryOnce(client, query, first, after);
  const edges = getOr([], [...path, `edges`], data);
  const nodes = edges.map(edge => edge.node);

  aggregatedResponse = aggregatedResponse
    ? aggregatedResponse.concat(nodes)
    : nodes;

  if (get([...path, `pageInfo`, `hasNextPage`], data)) {
    return queryAll(
      client,
      path,
      query,
      first,
      last(edges).cursor,
      aggregatedResponse,
    );
  }

  return aggregatedResponse;
};
*/
