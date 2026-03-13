"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { getFlagshipDealContext } from "@/data/flagship-deals";
import type { Account } from "@/types";
import type { SectionId } from "@/components/layout/sidebar";
import { cn } from "@/lib/utils";

type Stage = "Discovery" | "Early" | "Target";

function deriveStage(accountId: string): Stage {
  const flagship = getFlagshipDealContext(accountId);
  if (!flagship) return "Discovery";
  const done = flagship.milestones.filter((m) => m.status === "done").length;
  if (done >= 3) return "Target";
  if (done >= 1) return "Early";
  return "Discovery";
}

function pilotShortName(scope: string): string {
  const first = scope.split("—")[0]?.trim() ?? scope;
  if (first.includes("Clinical trial")) return "Clinical Analytics";
  if (first.includes("R&D data")) return "R&D Data Lake";
  if (first.includes("trial data")) return "Trial Analytics";
  if (first.includes("knowledge") || first.includes("document")) return "Knowledge & Docs";
  if (first.includes("Vaccines")) return "Vaccines Platform";
  return first.slice(0, 40) + (first.length > 40 ? "…" : "");
}

function riskShort(keyRisk: string): string {
  if (keyRisk.includes("Snowflake")) return "Snowflake";
  if (keyRisk.includes("Palantir")) return "Palantir";
  if (keyRisk.includes("Security") || keyRisk.includes("Quality")) return "Security review";
  if (keyRisk.includes("Legal")) return "Legal review";
  if (keyRisk.includes("EU") || keyRisk.includes("GDPR")) return "EU residency";
  if (keyRisk.includes("Budget") || keyRisk.includes("procurement")) return "Budget";
  return keyRisk.slice(0, 25) + (keyRisk.length > 25 ? "…" : "");
}

interface TerritoryCommandCenterProps {
  accounts: Account[];
  onAccountSelect: (accountId: string) => void;
  onSectionChange: (section: SectionId) => void;
}

const COLS = ["Account", "Stage", "Champion", "Pilot", "Risk", "Expansion"] as const;

export function TerritoryCommandCenter({
  accounts,
  onAccountSelect,
  onSectionChange,
}: TerritoryCommandCenterProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="space-y-6"
    >
      <SectionHeader
        title="HLS Territory Control Panel"
        subtitle="How I run this territory — at a glance"
      />

      <div className="overflow-x-auto rounded-xl border border-surface-border/50 bg-surface-elevated/40">
        <table className="w-full min-w-[640px] text-left">
          <thead>
            <tr className="border-b border-surface-border/50">
              {COLS.map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-text-faint"
                >
                  {col}
                </th>
              ))}
              <th className="w-8 px-2 py-3" aria-hidden />
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, i) => {
              const flagship = getFlagshipDealContext(account.id);
              const stage = deriveStage(account.id);
              const champion = flagship
                ? flagship.championTitle.split(",")[0]?.trim() ?? flagship.championName
                : "—";
              const pilot = flagship
                ? pilotShortName(flagship.pilotCriteria.scope)
                : account.firstWedge.slice(0, 35) + "…";
              const risk = flagship
                ? riskShort(flagship.competitiveBattle.keyRisk)
                : account.topBlockers[0]?.slice(0, 25) ?? "—";
              const expansion = account.topExpansionPaths[0] ?? "—";

              return (
                <motion.tr
                  key={account.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  className={cn(
                    "group border-b border-surface-border/30 last:border-b-0",
                    "hover:bg-surface-muted/30 transition-colors"
                  )}
                >
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => {
                        onAccountSelect(account.id);
                        onSectionChange("overview");
                      }}
                      className="text-left font-medium text-text-primary hover:text-accent transition-colors"
                    >
                      {account.name}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex rounded-md px-2 py-0.5 text-[11px] font-medium",
                        stage === "Target" && "bg-accent/15 text-accent",
                        stage === "Early" && "bg-surface-muted/80 text-text-secondary",
                        stage === "Discovery" && "text-text-muted"
                      )}
                    >
                      {stage}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[12px] text-text-secondary">
                    {champion}
                  </td>
                  <td className="px-4 py-3 text-[12px] text-text-secondary">
                    {pilot}
                  </td>
                  <td className="px-4 py-3 text-[12px] text-text-muted">
                    {risk}
                  </td>
                  <td className="px-4 py-3 text-[12px] text-text-secondary">
                    {expansion.length > 50 ? expansion.slice(0, 50) + "…" : expansion}
                  </td>
                  <td className="px-2 py-3">
                    <button
                      type="button"
                      onClick={() => {
                        onAccountSelect(account.id);
                        onSectionChange("overview");
                      }}
                      className="rounded p-1 text-text-faint opacity-0 transition-opacity group-hover:opacity-100 hover:text-accent"
                      aria-label={`Open ${account.name}`}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
