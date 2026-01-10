/**
 * Centralized GraphQL queries
 * Keeps queries reusable and readable
 */

/**
 * Fetch user repositories
 * - Limited to 50 most recently updated
 * - Includes language, size, activity
 */
export const GET_REPOS = `
query ($login: String!) {
  user(login: $login) {
    repositories(first: 50, orderBy: {field: UPDATED_AT, direction: DESC}) {
      nodes {
        name
        primaryLanguage { name }
        diskUsage
        pushedAt
        defaultBranchRef { name }
      }
    }
  }
}`;
