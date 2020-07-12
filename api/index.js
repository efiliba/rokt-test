const endpoint = 'https://api.github.com/graphql';

const query = `query listRepositories($query: String!, $pageSize: Int!) {
  search(query: $query, type: REPOSITORY, first: $pageSize) {
    repositoryCount
    edges {
      node {
        ... on Repository {
          repositoryId: id
          name
          watchers {
            totalCount
          }
        }
      }
    }
  }
}`;

// Get repository's id, name and watchers count, sorted by number of stars
export const repositoriesByStars = async (search, pageSize = 10) => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query, variables: { query: `${search} sort:stars-desc`, pageSize }})
    });

    const { data, message } = await response.json();

    if (!data) {
      return { error: `Error retrieving repositories for ${search}: ${message}`};
    }

    return extractData(data);
  } catch (e) {
    return { error: "Network error, please try again" };
  }
};

const extractData = data => ({
  repositoryCount: data.search.repositoryCount,
  repositories: data.search.edges.map(({node}) => ({
    id: node.repositoryId,
    name: node.name,
    watchersCount: node.watchers.totalCount
  }))
});
