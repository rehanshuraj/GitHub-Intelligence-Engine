import axios from "axios";
import fs from "fs";
import path from "path";
import unzipper from "unzipper";

export async function downloadRepo(
  username,
  repo,
  accessToken
) {
  const url = `https://api.github.com/repos/${username}/${repo}/zipball`;

  const outputDir = path.resolve("tmp", repo);

  // If already downloaded, reuse
  if (fs.existsSync(outputDir)) {
    return outputDir;
  }

  fs.mkdirSync(outputDir, { recursive: true });

  // Download zip as stream
  const response = await axios.get(url, {
    responseType: "stream",
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  // ✅ Correct stream → Promise handling
  return new Promise((resolve, reject) => {
    response.data
      .pipe(unzipper.Extract({ path: outputDir }))
      .on("close", () => resolve(outputDir))
      .on("error", err => reject(err));
  });
}
