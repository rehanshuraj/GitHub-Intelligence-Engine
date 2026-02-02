import fs from "fs";
import path from "path";
import axios from "axios";
import unzipper from "unzipper";

export async function downloadRepo(username, repo, token) {
  const zipUrl = `https://api.github.com/repos/${username}/${repo}/zipball`;
  const tmpDir = path.join(process.cwd(), "tmp");
  const repoDir = path.join(tmpDir, repo);

  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
  if (fs.existsSync(repoDir)) return repoDir;

  const response = await axios({
    url: zipUrl,
    method: "GET",
    responseType: "stream",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json"
    }
  });
  
  await new Promise((resolve, reject) => {
    response.data
      .pipe(unzipper.Extract({ path: repoDir }))
      .on("close", resolve)
      .on("error", reject);
  });

  return repoDir;
}
