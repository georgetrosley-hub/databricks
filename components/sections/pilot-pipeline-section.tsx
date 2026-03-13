"use client";

import { motion } from "framer-motion";
import {
  FlaskConical,
  FileText,
  Users,
  Target,
  TrendingUp,
  ChevronDown,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { getPilotPipeline } from "@/data/pilot-pipeline";
import { useState } from "react";
import { cn } from "@/lib/utils";

const EXPANSION_PHASES = [
  { phase: "Initial pilot", desc: "Narrow use case, defined success criteria" },
  { phase: "Data engineering", desc: "Pipelines, ingestion, orchestration" },
  { phase: "ML experimentation", desc: "Feature store, model training" },
  { phase: "AI deployment", desc: "Mosaic AI, model serving, GenAI" },
  { phase: "Governed lakehouse", desc: "Unity Catalog, enterprise-wide" },
];

export function PilotPipelineSection() {
  const pipeline = getPilotPipeline();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="space-y-10"
    >
      <SectionHeader
        title="Pilot pipeline"
        subtitle="First-use cases across the territory"
      />

      <div className="space-y-4">
        {pipeline.map((pilot, i) => {
          const isExpanded = expandedId === pilot.accountId;
          return (
            <motion.div
              key={pilot.accountId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-surface-border/50 bg-surface-elevated/40 overflow-hidden"
            >
              <button
                type="button"
                onClick={() =>
                  setExpandedId(isExpanded ? null : pilot.accountId)
                }
                className="flex w-full items-center justify-between gap-4 p-5 text-left hover:bg-surface-muted/30 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[14px] font-semibold text-text-primary">
                      {pilot.accountName}
                    </h3>
                    <span
                      className={cn(
                        "rounded-md px-2 py-0.5 text-[10px] font-medium uppercase",
                        pilot.status === "in_pilot" && "bg-accent/15 text-accent",
                        pilot.status === "scoped" && "bg-surface-muted/80 text-text-secondary",
                        pilot.status === "identified" && "bg-surface-muted/60 text-text-muted"
                      )}
                    >
                      {pilot.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="mt-1 text-[12px] text-text-muted">{pilot.useCase}</p>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-text-faint transition-transform",
                    isExpanded && "rotate-180"
                  )}
                />
              </button>

              {isExpanded && (
                <div className="border-t border-surface-border/40 p-5 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-3.5 w-3.5 text-accent/80" />
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                        Problem statement
                      </span>
                    </div>
                    <p className="text-[13px] text-text-secondary leading-relaxed">
                      {pilot.problemStatement}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FlaskConical className="h-3.5 w-3.5 text-accent/80" />
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                        Technical architecture
                      </span>
                    </div>
                    <p className="text-[13px] text-text-secondary">
                      {pilot.technicalArchitecture}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-3.5 w-3.5 text-accent/80" />
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                        Stakeholders required
                      </span>
                    </div>
                    <p className="text-[13px] text-text-secondary">
                      {pilot.stakeholdersRequired.join(" · ")}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-3.5 w-3.5 text-accent/80" />
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                        Success criteria
                      </span>
                    </div>
                    <ul className="space-y-1 text-[13px] text-text-secondary">
                      {pilot.successCriteria.map((c, j) => (
                        <li key={j}>• {c}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-3.5 w-3.5 text-accent/80" />
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                        Expansion potential
                      </span>
                    </div>
                    <p className="text-[13px] text-text-secondary">
                      {pilot.expansionPotential}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-accent/20 bg-accent/[0.04] p-6">
        <h3 className="text-[13px] font-semibold text-text-primary mb-4">
          Pilot → Platform expansion path
        </h3>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 overflow-x-auto pb-2">
          {EXPANSION_PHASES.map((p, i) => (
            <div key={i} className="flex items-center gap-2 shrink-0">
              <div className="rounded-lg border border-accent/20 bg-surface-elevated/60 px-3 py-2 min-w-[140px]">
                <p className="text-[11px] font-semibold text-accent/90">
                  {p.phase}
                </p>
                <p className="text-[10px] text-text-muted mt-0.5">{p.desc}</p>
              </div>
              {i < EXPANSION_PHASES.length - 1 && (
                <span className="text-text-faint hidden sm:inline">→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
