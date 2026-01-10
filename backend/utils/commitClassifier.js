/**
 * Classifies commit message intent
 * This is a strong signal of engineering discipline
 */

export function classifyCommit(message){
    const msg=message.toLowerCase();

    if(msg.startsWith("feat")) return "feat";
    if(msg.startsWith("fix")) return "fix";
    if(msg.startsWith("refactor")) return "refactor";
    if(msg.startsWith("test")) return "test";
    if(msg.startsWith("chore") || msg.startsWith("docs")) return "chore";

    //poor or unclear commit intent 
    return "other";
}