"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Database,
  Cpu,
  Target,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { getAccountIntelligence } from "@/data/account-intelligence";
import { getFlagshipDealContext } from "@/data/flagship-deals";
import type { Account } from "@/types";
import type { SectionId } from "@/components/layout/sidebar";
import { cn } from "@/lib/utils";

function maturityLabel(score: number) {
  if (score >= 80) return { label: "Advanced", color: "text-accent" };
  if (score >= 60) return { label: "Growing", color: "text-text-secondary" };
  return { label: "Early", color: "text-text-muted" };
}

interface TerritoryCommandCenterProps {
  accounts: Account[];
  onAccountSelect: (accountId: string) => void;
  onSectionChange: (section: SectionId) => void;
}

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
      className="space-y-8 sm:space-y-10"
    >
      <SectionHeader
        title="HLS Territory Command Center"
        subtitle="Strategic accounts — where to spend time"
      />

      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {accounts.map((account, i) => {
          const intel = getAccountIntelligence(account.id);
          const flagship = getFlagshipDealContext(account.id);
          const aiMaturity = maturityLabel(account.aiMaturityScore);
          const totalOpp = account.estimatedLandValue + account.estimatedExpansionValue;

          return (
            <motion.button
              key={account.id}
              type="button"
              onClick={() => {
                onAccountSelect(account.id);
                onSectionChange("overview");
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              className={cn(
                "group flex flex-col rounded-2xl border border-surface-border/50 bg-surface-elevated/50 p-5 text-left transition-colors",
                "hover:border-accent/30 hover:bg-surface-elevated/80"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-[14px] font-semibold text-text-primary">
                    {account.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-[12px] text-text-muted">
                    {account.firstWedge}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-text-faint transition-colors group-hover:text-accent" />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-[11px]">
                <div className="flex items-center gap-2">
                  <Cpu className="h-3.5 w-3.5 text-text-faint" />
                  <span className="text-text-muted">AI maturity</span>
                  <span className={cn("font-medium", aiMaturity.color)}>
                    {aiMaturity.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="h-3.5 w-3.5 text-text-faint" />
                  <span className="text-text-muted">Data posture</span>
                  <span className="truncate text-text-secondary">
                    {intel?.cloudAlignment ?? "—"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-3.5 w-3.5 text-text-faint" />
                  <span className="text-text-muted">Pilot</span>
                  <span className="text-text-secondary">
                    {flagship ? "Scoped" : "Identified"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-3.5 w-3.5 text-text-faint" />
                  <span className="text-text-muted">Expansion</span>
                  <span className="font-medium text-accent/90">
                    ${totalOpp.toFixed(1)}M
                  </span>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {account.existingVendorFootprint.slice(0, 3).map((v) => (
                  <span
                    key={v}
                    className="rounded-md bg-surface-muted/60 px-2 py-0.5 text-[10px] text-text-muted"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
