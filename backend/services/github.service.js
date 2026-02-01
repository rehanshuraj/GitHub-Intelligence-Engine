import axios from "axios";
import { GET_REPOS } from "../graphql/queries.js";

export async function fetchRepos(username, token) {
  const res = await axios.post(
    "https://api.github.com/graphql",
    { query: GET_REPOS, variables: { login: username } },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return res.data.data.user.repositories.nodes;
}
