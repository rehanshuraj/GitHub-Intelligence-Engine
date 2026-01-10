/**
 * Talks to GitHub GraphQL API
 * Responsible ONLY for fetching data
 */

import axios from 'axios'
import { GET_REPOS } from "../graphql/queries.js";

/**
 * Fetch repositories for a GitHub user
 */

export async function fetchRepos(username,token) {
    const response = await axios.post(
        "https://api.github.com/graphql",
        {
            query:GET_REPOS,
            variables:{login:username}
        },
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );
    return response.data.data.user.repositories.nodes;
}