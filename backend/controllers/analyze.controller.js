/**
 * Main analysis controller
 * Orchestrates:
 * - Repo fetch
 * - Filtering
 * - Commit analysis
 * - Scoring
 */

import jwt from "jsonwebtoken";
import {fetchRepos} from "../services/github.service.js"
import { filterRepos } from "../repoFilter.js";
import { fetchCommits } from "../services/commit.service.js";
import { calculateCommitScore } from "../services/commitScore.js";
import { downloadRepo } from "../services/repoDownload.service.js";
import { analyzeFile, getAllJSFiles } from "../services/codeAnalysis.service.js";

export async function analyzeUser(req,res){
    try{
       const {username} = req.params;

       //extract github token from jwt 
       const jwttoken = req.headers.authorization;
       const {accessToken} = jwt.verify(jwttoken, process.env.JWT_SECRET);

       //step 1: fetch & filter repositories
       const repos = await fetchRepos(username,accessToken);
       const filteredRepos = filterRepos(repos);

       const results = [];

       //step 2: analyze commits per repos 
       for (const repo of filterRepos){
        const commits = await fetchCommits(
            username,
            repo.name,
            repo.defaultBranchRef.name,
            accessToken
        );
        const commitScore = calculateCommitScore(commits);

        results.push({
            repo: repo.name,
            commitScore,
            commitsAnalyzed: commits.length
        });
        // 1️ Download repo
        const repoPath = await downloadRepo(
        username,
        repo.name,
        accessToken
        );
        // 2️ Collect JS files
        const jsFiles = getAllJSFiles(repoPath);

        // 3️ Analyze each file
        for (const file of jsFiles) {
            const metrics = analyzeFile(file);
            allComplexityMetrics.push(...metrics);
        }
       }
       res.json(results);
    }
    catch(err){
        res.status(500).json({ error: err.message});
    }
}