export interface PartnerEntry {
  category: "Cloud" | "System Integrator" | "Consulting" | "Data & AI Ecosystem";
  name: string;
  role: string;
  influence: "critical" | "high" | "medium" | "low";
}

export const partnerStrategy: Record<string, PartnerEntry[]> = {
  jnj: [
    { category: "Cloud", name: "AWS", role: "Primary cloud; data residency US", influence: "critical" },
    { category: "System Integrator", name: "Accenture / Deloitte", role: "Enterprise transformation", influence: "high" },
    { category: "Data & AI Ecosystem", name: "Veeva", role: "CRM/Vault; need analytics integration", influence: "critical" },
    { category: "Consulting", name: "Life sciences advisory", role: "GxP, validation, regulatory", influence: "high" },
  ],
  merck: [
    { category: "Cloud", name: "AWS", role: "Primary cloud", influence: "critical" },
    { category: "Data & AI Ecosystem", name: "Palantir", role: "Foundry in R&D; additive not displacement", influence: "high" },
    { category: "System Integrator", name: "Slalom / global SIs", role: "Data platform implementation", influence: "medium" },
  ],
  bms: [
    { category: "Cloud", name: "AWS", role: "Primary cloud", influence: "critical" },
    { category: "Data & AI Ecosystem", name: "Veeva", role: "Clinical and commercial", influence: "critical" },
    { category: "Data & AI Ecosystem", name: "Snowflake", role: "In evaluation; competitive", influence: "high" },
    { category: "Consulting", name: "Life sciences SIs", role: "Trial analytics, regulatory", influence: "medium" },
  ],
  pfizer: [
    { category: "Cloud", name: "AWS", role: "Primary cloud", influence: "critical" },
    { category: "Data & AI Ecosystem", name: "Veeva", role: "Clinical and commercial", influence: "critical" },
    { category: "Consulting", name: "Regulatory and GxP consultants", role: "Validation, legal", influence: "high" },
  ],
  sanofi: [
    { category: "Cloud", name: "AWS", role: "Primary", influence: "high" },
    { category: "Cloud", name: "Google Cloud", role: "Vaccines, data", influence: "high" },
    { category: "Data & AI Ecosystem", name: "Veeva", role: "Clinical and commercial", influence: "critical" },
    { category: "Consulting", name: "EU data / GDPR specialists", role: "Data residency, DPA", influence: "high" },
  ],
};

export function getPartnerStrategy(accountId: string): PartnerEntry[] {
  return partnerStrategy[accountId] ?? [];
}
