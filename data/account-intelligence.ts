import type { Account } from "@/types";

export interface AccountIntelligence {
  accountId: string;
  strategicInitiatives: string[];
  recentLeadershipChanges?: string[];
  regulatoryPressures: string[];
  digitalTransformation: string[];
  cloudAlignment: "AWS" | "Azure" | "GCP" | "Multi-cloud";
  dataArchitectureSignals: string[];
  aiMlInitiatives: string[];
}

export const accountIntelligence: Record<string, AccountIntelligence> = {
  jnj: {
    accountId: "jnj",
    strategicInitiatives: [
      "Healthcare of the future: digital, data-driven care delivery",
      "Pharma R&D productivity and pipeline acceleration",
      "MedTech connected devices and digital surgery",
    ],
    recentLeadershipChanges: [
      "Lidia Fonseca joined as CDO/CTO (2021) — driving enterprise data strategy",
      "Jennifer Taubert — J&J Pharma Chair, commercial and R&D focus",
    ],
    regulatoryPressures: [
      "FDA digital health and real-world evidence expectations",
      "GxP validation requirements for AI/ML in regulated workflows",
      "Data integrity (ALCOA+) and audit trail requirements",
    ],
    digitalTransformation: [
      "Unifying pharma and medtech data platforms",
      "Clinical trial digitization and site analytics",
      "RWE and patient outcomes infrastructure",
    ],
    cloudAlignment: "AWS",
    dataArchitectureSignals: [
      "Centralizing trial analytics; SAS/Excel legacy in Clinical Data Sciences",
      "Snowflake evaluation for data warehouse",
      "Veeva Vault for clinical; need analytics layer on top",
    ],
    aiMlInitiatives: [
      "Drug discovery and target identification",
      "Clinical trial optimization",
      "Medical affairs and HCP engagement",
    ],
  },
  merck: {
    accountId: "merck",
    strategicInitiatives: [
      "Accelerating oncology and vaccine pipeline",
      "R&D data and compute modernization",
      "AI/ML for discovery and development",
    ],
    recentLeadershipChanges: [
      "Sanat Chattopadhyay (EVP R&D) — data-driven R&D",
      "Jim Clyne (CIO) — infrastructure and platform",
    ],
    regulatoryPressures: [
      "FDA AI/ML in drug development guidance",
      "IP protection and data residency",
      "21 CFR Part 11 for electronic records",
    ],
    digitalTransformation: [
      "R&D data lake consolidation",
      "Computational chemistry and target discovery",
      "Clinical trial data platform",
    ],
    cloudAlignment: "AWS",
    dataArchitectureSignals: [
      "Palantir Foundry in some R&D workflows",
      "Scattered data across discovery, preclinical, clinical",
      "Strong interest in Mosaic AI for chemistry",
    ],
    aiMlInitiatives: [
      "Computational chemistry and molecular modeling",
      "Clinical trial design optimization",
      "Manufacturing and supply chain",
    ],
  },
  bms: {
    accountId: "bms",
    strategicInitiatives: [
      "Cell therapy and immuno-oncology leadership",
      "Data platform for R&D and commercial",
      "Manufacturing and supply chain digitization",
    ],
    regulatoryPressures: [
      "Cell therapy regulatory complexity",
      "GxP for manufacturing and quality",
      "Data integrity for submissions",
    ],
    digitalTransformation: [
      "Clinical data platform consolidation",
      "Veeva integration for trial and commercial",
      "RWE and outcomes research",
    ],
    cloudAlignment: "AWS",
    dataArchitectureSignals: [
      "Snowflake evaluation for data warehouse",
      "Clinical Dev Ops needs trial analytics",
      "Veeva Vault — need analytics layer",
    ],
    aiMlInitiatives: [
      "Clinical trial analytics",
      "Medical affairs analytics",
      "Manufacturing quality",
    ],
  },
  pfizer: {
    accountId: "pfizer",
    strategicInitiatives: [
      "Post-COVID portfolio optimization",
      "R&D productivity and pipeline",
      "Digital and data infrastructure",
    ],
    recentLeadershipChanges: [
      "Lidia Fonseca (CDO/CTO) — enterprise data and AI",
      "Dawn Rogers (CPO) — commercial and medical",
    ],
    regulatoryPressures: [
      "FDA expectations for AI-assisted submissions",
      "GxP for regulated document workflows",
      "Data residency and IP",
    ],
    digitalTransformation: [
      "Medical affairs knowledge and HCP engagement",
      "Clinical documentation and submission prep",
      "R&D data platform",
    ],
    cloudAlignment: "AWS",
    dataArchitectureSignals: [
      "Microsoft Copilot, Veeva, internal tools",
      "Medical Affairs exploring governed AI",
      "Legacy document and knowledge systems",
    ],
    aiMlInitiatives: [
      "Drug discovery",
      "Regulated document workflows",
      "Medical information and HCP engagement",
    ],
  },
  sanofi: {
    accountId: "sanofi",
    strategicInitiatives: [
      "Vaccines and immunology focus",
      "Flatten the curve — R&D productivity",
      "Digital health and patient engagement",
    ],
    regulatoryPressures: [
      "EU GDPR and data residency",
      "Vaccines regulatory complexity",
      "GxP and audit requirements",
    ],
    digitalTransformation: [
      "Vaccines data platform unification",
      "R&D and manufacturing analytics",
      "Multi-cloud strategy",
    ],
    cloudAlignment: "Multi-cloud",
    dataArchitectureSignals: [
      "AWS and Google Cloud in use",
      "Fragmented vaccines data",
      "EU data residency non-negotiable",
    ],
    aiMlInitiatives: [
      "Vaccines R&D",
      "Digital health data",
      "Manufacturing and quality",
    ],
  },
};

export function getAccountIntelligence(accountId: string): AccountIntelligence | null {
  return accountIntelligence[accountId] ?? null;
}
