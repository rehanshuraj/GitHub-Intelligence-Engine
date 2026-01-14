/**
 * Fetch commit history for a repository
 */
import axios from "axios";

const GET_COMMITS = `
query ($owner: String!, $repo: String!, $branch: String!) {
  repository(owner: $owner, name: $repo) {
    ref(qualifiedName: $branch) {
      target {
        ... on Commit {
          history(first: 50) {
            nodes {
              messageHeadline
              additions
              deletions
              committedDate
            }
          }
        }
      }
    }
  }
}`;

export async function fetchCommits(owner,repo,branch,token){
    const response = await axios.post(
        "https://api.github.com/graphql",
        {
            query: GET_COMMITS,
            variables: { owner, repo, branch }
        },
        {
          headers: {
             Authorization: `Bearer ${token}`
          }
        }
    );
    return response.data.data.repository.ref.target.history.nodes;
}
