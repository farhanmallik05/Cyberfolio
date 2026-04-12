
import { fetchGithubProjects } from "./github-api";

export interface CommandResponse {
  output: string;
  type: "info" | "success" | "warning" | "error" | "ascii";
  redirect?: string;
}

export const COMMANDS: Record<string, (args: string[]) => Promise<CommandResponse>> = {
  help: async () => ({
    output: `
AVAILABLE COMMANDS:
  help      - Display this directory
  who       - Reveal subject dossier
  projects  - List active deployments
  social    - Open neural node network
  now       - View current heartbeat
  uses      - Audit neural armory
  skills    - Show neural constellation
  clear     - Wipe terminal buffer
  contact   - Initiate secure link
  sudo hire - [REDACTED]
`,
    type: "info"
  }),

  uses: async () => ({
    output: "AUDITING NEURAL ARMORY... MISSION CONFIG LOADED at /uses",
    type: "success",
    redirect: "/uses"
  }),

  now: async () => ({
    output: "SYNCING HEARTBEAT... DATA STREAM ESTABLISHED at /now",
    type: "success",
    redirect: "/now"
  }),

  social: async () => ({
    output: "OPENING NEURAL NODE NETWORK... UPLINK ESTABLISHED at /social",
    type: "success",
    redirect: "/social"
  }),

  who: async () => ({
    output: "SUBJECT: FARHAN MALLIK\nROLE: AI ARCHITECT / FULLSTACK BUILDER\nSTATUS: ACTIVE\nLOCATION: GREATER NOIDA, INDIA\nCLEARANCE: LEVEL 9",
    type: "success"
  }),

  projects: async () => {
    const repos = await fetchGithubProjects();
    const list = repos.map(r => `> ${r.title} (${r.stars}★)`).join("\n");
    return {
      output: `ACTIVE DEPLOYMENTS:\n${list || "No transmissions detected."}`,
      type: "success",
      redirect: "/projects"
    };
  },

  skills: async () => ({
    output: "NEURAL CONSTELLATION:\n- LANGUAGES: TS, JS, PYTHON, SOLIDITY\n- FRAMEWORKS: NEXT.JS, REACT, FASTAPI\n- TOOLS: GSAP, THREE.JS, N8N, DOCKER",
    type: "info",
    redirect: "/skills"
  }),

  contact: async () => ({
    output: "INITIATING SECURE LINK...\nEMAIL: farhanmallick\nGITHUB: @farhanmallik05\nLINKEDIN: /in/farhanmallik",
    type: "success",
    redirect: "/contact"
  }),

  "sudo hire": async () => ({
    output: "ACCESS GRANTED. OVERRIDING PAYWALL...\nPRIORITY: HIGH\nSTATUS: READY TO BUILD.\nDM FOR RATES.",
    type: "warning"
  })
};
