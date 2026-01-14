/**
 * Filters repositories that are meaningful for analysis
 * We avoid:
 * - Small toy repos
 * - Inactive projects
 * - Non-JS/TS repos
 */

export function filterRepos(repos){
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth()-6);

    return repos.filter(repo=>{
        const language = repo.primaryLanguage?.name;
        const activeRecently = new Date(repo.pushedAt)>sixMonthsAgo;
        const bigEnough = repo.diskUsage > 500;

        return (
           (language === "JavaScript" || language === "TypeScript") &&
            activeRecently &&
            bigEnough 
        );
    });
}