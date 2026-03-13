import { getFlagshipDealContext } from "./flagship-deals";
import { accounts } from "./accounts";
import type { Account } from "@/types";

export interface PilotOpportunity {
  accountId: string;
  accountName: string;
  useCase: string;
  problemStatement: string;
  technicalArchitecture: string;
  stakeholdersRequired: string[];
  successCriteria: string[];
  expansionPotential: string;
  status: "identified" | "scoped" | "in_pilot" | "expansion";
}

export function getPilotPipeline(): PilotOpportunity[] {
  const pipeline: PilotOpportunity[] = [];

  for (const account of accounts) {
    const flagship = getFlagshipDealContext(account.id);
    if (flagship) {
      pipeline.push({
        accountId: account.id,
        accountName: account.name,
        useCase: flagship.pilotCriteria.scope.split("—")[0]?.trim() ?? account.firstWedge,
        problemStatement: flagship.pilotCriteria.scope,
        technicalArchitecture: "Delta Lake, Unity Catalog, Mosaic AI (as relevant)",
        stakeholdersRequired: [flagship.championTitle, ...flagship.pilotCriteria.owner.split("+").map((s) => s.trim())],
        successCriteria: flagship.pilotCriteria.successMetrics,
        expansionPotential: flagship.competitiveBattle.winCondition,
        status: flagship.milestones.some((m) => m.status === "in_progress") ? "in_pilot" : "scoped",
      });
    } else {
      pipeline.push({
        accountId: account.id,
        accountName: account.name,
        useCase: account.firstWedge.split(" with ")[0] ?? account.firstWedge,
        problemStatement: account.firstWedge,
        technicalArchitecture: "Lakehouse, Unity Catalog",
        stakeholdersRequired: ["CDO / Data Leadership", "Clinical or R&D lead"],
        successCriteria: ["Pilot scope agreed", "Security/Quality sign-off", "30–90 day proof point"],
        expansionPotential: account.topExpansionPaths[0] ?? "Expand to adjacent use cases",
        status: "identified",
      });
    }
  }

  return pipeline;
}
