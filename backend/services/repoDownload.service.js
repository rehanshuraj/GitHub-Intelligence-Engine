/**
 * Repo Download Service
 * ---------------------
 * Downloads a GitHub repository as ZIP
 * Extracts it locally for static analysis
 */

import axios from "axios";
import fs from 'fs'
import path from 'path'
import unzipper from 'unzipper'
import { promiseHooks } from "v8";

/**
 * Downloads and extracts a GitHub repo
 */


export async function downloadRepo(owner,repo,token){
    // 1️ Create temp folder if not exists
    const baseDir = path.join(process.cwd(), "temp");
    if(!fs.existsSync(baseDir)){
        fs.mkdirSync(baseDir);
    }

    const zipPath = path.join(baseDir, `${repo}.zip`);
    const extractPath = path.join(baseDir,`${repo}`);

    // 2️ Download repo as ZIP
    const response = await axios({
        method: "GET",
        url: `https://api.github.com/repos/${owner}/${repo}/zipball`,
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json"
        },
        responseType: "stream"
    })

    // 3 save ZIP file
    const writer = fs.createWriteStream(zipPath);
    response.data.pipe(writer);
    
    await new promise((resolve,reject)=>{
        writer.on("finish",resolve);
        writer.on("error",reject);
    });

    // 4️ Extract ZIP
    await fs
      .createReadStream(zipPath)
      .pipe(unzipper.Extract({ path: extractPath }))
      .promise();

    return extractPath; //local folder path
}