import * as readline from "readline";
import * as fs from "fs";

// ===== Smart Local Zypher Agent =====
class ZypherAgent {
  async runTask(jd: string) {
    const skills = this.extractSkills(jd);
    const technologies = this.extractTechnologies(jd);
    const responsibilities = this.extractResponsibilities(jd);
    const qualifications = this.extractQualifications(jd);

    return {
      skills,
      technologies,
      responsibilities,
      qualifications,
      summary: `Experienced professional with skills in ${skills.join(", ")} and hands-on experience with ${technologies.join(", ")}. Skilled at ${responsibilities.join(", ")}.`,
      coverLetter: this.generateCoverLetter(skills, technologies, responsibilities, jd)
    };
  }

  extractSkills(jd: string) {
    const skillsList = ["Java", "Python", "Go", "C++", "JavaScript", "TypeScript", "React", "Spring Boot", "Node.js", "Shell scripting", "SQL"];
    return skillsList.filter(skill => jd.toLowerCase().includes(skill.toLowerCase()));
  }

  extractTechnologies(jd: string) {
    const techList = ["REST API", "GraphQL", "Docker", "Kubernetes", "AWS", "Azure", "GCP", "RDS", "EC2", "S3", "CI/CD", "PostgreSQL", "MySQL", "MongoDB"];
    return techList.filter(tech => jd.toLowerCase().includes(tech.toLowerCase()));
  }

  extractResponsibilities(jd: string) {
    const keywords = ["develop", "design", "implement", "build", "maintain", "optimize", "integrate"];
    return jd
      .split("\n")
      .filter(line => keywords.some(k => line.toLowerCase().includes(k)))
      .map(line => line.trim());
  }

  extractQualifications(jd: string) {
    const keywords = ["experience", "proficient", "knowledge", "understanding", "fluent"];
    return jd
      .split("\n")
      .filter(line => keywords.some(k => line.toLowerCase().includes(k)))
      .map(line => line.trim());
  }

  generateCoverLetter(skills: string[], techs: string[], responsibilities: string[], jd: string) {
    return `Dear Hiring Manager,

I am excited to apply for this position. My experience with ${skills.join(", ")} and expertise in ${techs.join(", ")} align perfectly with your requirements. I have successfully ${responsibilities.join(", ")} in previous projects, and I am confident I can contribute effectively to your team.

I am eager to bring my skills and enthusiasm to this role and help achieve outstanding results.

Thank you for your time and consideration.

Sincerely,
[Your Name]`;
  }
}

// ===== Helper for terminal input =====
function askQuestion(query: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(query, ans => { rl.close(); resolve(ans); }));
}

// ===== Main Runner =====
async function run() {
  console.log("=== Smart Local Zypher Agent ===\n");
  const input = await askQuestion("Paste a job description (or type 'sample' to use sample-jd.txt): ");
  let jobDescription = input.toLowerCase() === "sample" ? fs.readFileSync("sample-jd.txt", "utf-8") : input;

  const agent = new ZypherAgent();
  const result = await agent.runTask(jobDescription);

  console.log("\n=== Agent Output ===\n");
  console.log(JSON.stringify(result, null, 2));

  fs.writeFileSync("results.json", JSON.stringify(result, null, 2));
  console.log("\nOutput saved to results.json");
}

run();
