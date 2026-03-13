/**
 * Deep deal context for flagship accounts: named progress, pilot criteria,
 * and competitive battle dynamics.
 */

export interface PilotCriteria {
  scope: string;
  successMetrics: string[];
  timeline: string;
  owner: string;
  securityPath: string;
}

export interface CompetitiveBattle {
  incumbent: string;
  displacementStrategy: string;
  keyRisk: string;
  winCondition: string;
}

export interface DealMilestone {
  label: string;
  date: string;
  status: "done" | "in_progress" | "upcoming";
  owner?: string;
}

export interface FlagshipDealContext {
  championName: string;
  championTitle: string;
  pilotCriteria: PilotCriteria;
  competitiveBattle: CompetitiveBattle;
  milestones: DealMilestone[];
  lastCallSummary?: string;
}

const flagshipDeals: Record<string, FlagshipDealContext> = {
  jpmorgan: {
    championName: "Marcus Chen",
    championTitle: "SVP, Model Risk Management",
    pilotCriteria: {
      scope: "Model risk documentation and review workflows for the Corporate & Investment Bank — 45 analysts, documentation-heavy process, governed output required.",
      successMetrics: [
        "50% reduction in doc review cycle time for model change packages",
        "Zero compliance findings in pilot audit",
        "Clear audit trail for all AI-assisted outputs",
      ],
      timeline: "60-day pilot, kickoff Mar 18, review gates at 30 and 60 days",
      owner: "Marcus Chen (Model Risk) + Sarah Kim (CIB Ops)",
      securityPath: "FedRAMP-equivalent controls, data residency in US, full audit logging. Model Risk and Legal co-signed on scope before pilot start.",
    },
    competitiveBattle: {
      incumbent: "Microsoft Copilot (bundled in M365 renewal), internal build on AWS Bedrock",
      displacementStrategy: "Don't fight the bundle. Force a narrow comparison: model risk documentation quality, governance controls, and auditability. Position Claude as the governed choice for regulated workflows, not a general productivity tool.",
      keyRisk: "Procurement pushes for 'one AI vendor' and folds us into a broader Microsoft or AWS deal. Need executive sponsor to protect the pilot as a separate evaluation.",
      winCondition: "Model Risk and Legal both sign off that Claude meets their bar. Pilot success creates permission for expansion into Legal and Compliance.",
    },
    milestones: [
      { label: "Intro call with Model Risk", date: "Mar 4", status: "done", owner: "George" },
      { label: "Pilot scope draft shared", date: "Mar 8", status: "done", owner: "Marcus Chen" },
      { label: "Security & architecture review", date: "Mar 18", status: "in_progress", owner: "CISO office" },
      { label: "Pilot kickoff", date: "Mar 25", status: "upcoming", owner: "Marcus Chen" },
      { label: "30-day review gate", date: "Apr 24", status: "upcoming" },
    ],
    lastCallSummary: "Marcus is aligned on scope. Security review is the gating item — they want a written deployment narrative and data-flow diagram before the Mar 18 meeting. Legal is watching but won't block if Model Risk and Security are comfortable.",
  },
  comcast: {
    championName: "Jennifer Walsh",
    championTitle: "Director, Platform Engineering",
    pilotCriteria: {
      scope: "Developer productivity for platform engineering — 120 engineers, Claude Code for internal tooling and documentation. Controlled cohort, no customer data.",
      successMetrics: [
        "20% improvement in code review throughput (measured by PR velocity)",
        "Reduced time-to-document for internal APIs",
        "Zero security incidents during pilot",
      ],
      timeline: "45-day pilot, target start Apr 1. Security sign-off required before kickoff.",
      owner: "Jennifer Walsh (Platform Eng) + Mike Torres (Security)",
      securityPath: "Air-gapped deployment option, no external API calls. Security wants a clean deployment story and identity controls before they approve.",
    },
    competitiveBattle: {
      incumbent: "GitHub Copilot (widespread), Cursor (shadow IT in some teams), Microsoft Copilot",
      displacementStrategy: "Don't compete on IDE integration. Compete on: (1) full reasoning and documentation beyond code completion, (2) enterprise controls and audit, (3) no Microsoft lock-in. Frame as 'governed AI for platform teams' vs 'individual productivity tools.'",
      keyRisk: "Microsoft EA renewal in Q3 — if Copilot gets bundled, we get squeezed. Need to land the pilot and prove value before the renewal conversation.",
      winCondition: "Platform engineering adopts Claude for a defined workflow. Security signs off. That creates the wedge for support automation and knowledge workflows.",
    },
    milestones: [
      { label: "Platform team intro", date: "Mar 5", status: "done", owner: "George" },
      { label: "Pilot scope agreed", date: "Mar 10", status: "done", owner: "Jennifer Walsh" },
      { label: "Security architecture review", date: "Mar 22", status: "in_progress", owner: "Mike Torres" },
      { label: "Pilot kickoff", date: "Apr 1", status: "upcoming", owner: "Jennifer Walsh" },
      { label: "45-day review", date: "May 15", status: "upcoming" },
    ],
    lastCallSummary: "Jennifer is ready to go. Security is the blocker — they want a written deployment narrative and answers on data flow before the Mar 22 review. Platform team is eager; we need to unblock Security quickly.",
  },
  pfizer: {
    championName: "Dr. Elena Vasquez",
    championTitle: "VP, Medical Affairs",
    pilotCriteria: {
      scope: "R&D knowledge retrieval and regulated document workflows — Medical Affairs team, 35 users. Focus on internal document search, HCP engagement prep, and submission-adjacent workflows. No patient data, no GxP-critical paths in pilot.",
      successMetrics: [
        "Faster retrieval of relevant internal docs for HCP inquiries",
        "Reduced manual prep time for medical information requests",
        "Full validation package for Legal and Quality before any GxP expansion",
      ],
      timeline: "90-day pilot (longer due to validation). Target kickoff Apr 8. Legal and Quality sign-off required.",
      owner: "Elena Vasquez (Medical Affairs) + Legal, Quality review",
      securityPath: "Data residency, access controls, audit trail. Legal wants explicit IP and data handling narrative. No GxP validation in pilot — that's phase two if pilot succeeds.",
    },
    competitiveBattle: {
      incumbent: "Microsoft Copilot, Veeva (CRM), internal knowledge tools",
      displacementStrategy: "Don't pitch broad AI. Pitch 'governed knowledge retrieval for regulated workflows.' Emphasize: no ad model, no training on customer data, clear audit trail. Position as the safe choice for a regulated environment.",
      keyRisk: "Legal and validation concerns slow the deal. Need a proof package they can forward internally without translating. GxP is a red herring for the pilot — we're not touching validated systems.",
      winCondition: "Medical Affairs gets a working pilot. Legal and Quality are comfortable with the deployment narrative. That opens expansion into clinical documentation and submission prep.",
    },
    milestones: [
      { label: "Medical Affairs intro", date: "Mar 6", status: "done", owner: "George" },
      { label: "Pilot scope draft", date: "Mar 12", status: "in_progress", owner: "Elena Vasquez" },
      { label: "Legal & Quality review", date: "Mar 28", status: "upcoming", owner: "Legal" },
      { label: "Pilot kickoff", date: "Apr 8", status: "upcoming", owner: "Elena Vasquez" },
      { label: "90-day review", date: "Jul 8", status: "upcoming" },
    ],
    lastCallSummary: "Elena is bought in. Regulated workflow angle resonates. Legal and validation want a much more explicit deployment narrative before they sign off. Next step: package the security and governance response so a regulated buyer can forward it internally.",
  },
};

export function getFlagshipDealContext(accountId: string): FlagshipDealContext | null {
  return flagshipDeals[accountId] ?? null;
}

export function isFlagshipAccount(accountId: string): boolean {
  return accountId in flagshipDeals;
}
