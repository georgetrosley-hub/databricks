"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Building2, Target, User, Shield } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { StreamingContent } from "@/components/ui/streaming-content";
import { useStreaming } from "@/lib/hooks/use-streaming";
import { getFlagshipDealContext } from "@/data/flagship-deals";
import type { Account, Competitor } from "@/types";
import { cn } from "@/lib/utils";

interface DealSimulationProps {
  accounts: Account[];
  competitors: Competitor[];
}

function getEntryPoints(account: Account): { value: string; label: string }[] {
  const flagship = getFlagshipDealContext(account.id);
  const base = [
    { value: account.firstWedge, label: account.firstWedge.slice(0, 60) + (account.firstWedge.length > 60 ? "…" : "") },
  ];
  if (flagship) {
    const pilotLabel = flagship.pilotCriteria.scope.split("—")[0]?.trim();
    if (pilotLabel && !base.some((b) => b.value === pilotLabel)) {
      base.push({ value: pilotLabel, label: pilotLabel });
    }
  }
  return base;
}

function getChampions(account: Account): { value: string; label: string }[] {
  const flagship = getFlagshipDealContext(account.id);
  if (flagship) {
    return [
      {
        value: `${flagship.championName} (${flagship.championTitle})`,
        label: `${flagship.championName} — ${flagship.championTitle}`,
      },
    ];
  }
  return [
    { value: "VP Data Platform", label: "VP Data Platform" },
    { value: "VP Clinical Data Sciences", label: "VP Clinical Data Sciences" },
    { value: "VP Medical Affairs", label: "VP Medical Affairs" },
  ];
}

function getIncumbents(account: Account): { value: string; label: string }[] {
  const flagship = getFlagshipDealContext(account.id);
  const fromBattle = flagship?.competitiveBattle?.incumbent
    ? [{ value: flagship.competitiveBattle.incumbent, label: flagship.competitiveBattle.incumbent }]
    : [];
  const fromFootprint = account.existingVendorFootprint
    .filter((v) => !fromBattle.some((f) => f.value === v))
    .slice(0, 5)
    .map((v) => ({ value: v, label: v }));
  return [...fromBattle, ...fromFootprint];
}

export function DealSimulation({ accounts, competitors }: DealSimulationProps) {
  const [accountId, setAccountId] = useState<string>(accounts[0]?.id ?? "");
  const [entryPoint, setEntryPoint] = useState("");
  const [champion, setChampion] = useState("");
  const [incumbent, setIncumbent] = useState("");
  const stream = useStreaming();

  const account = accounts.find((a) => a.id === accountId) ?? accounts[0];
  const entryPoints = account ? getEntryPoints(account) : [];
  const champions = account ? getChampions(account) : [];
  const incumbents = account ? getIncumbents(account) : [];

  const runSimulation = useCallback(() => {
    if (!account) return;
    if (!entryPoint) setEntryPoint(entryPoints[0]?.value ?? account.firstWedge);
    if (!champion) setChampion(champions[0]?.value ?? "VP Data Platform");
    if (!incumbent) setIncumbent(incumbents[0]?.value ?? "—");

    const ctx = {
      account,
      entryPoint: entryPoint || account.firstWedge,
      champion: (champion || champions[0]?.value) ?? "VP Data Platform",
      incumbent: (incumbent || incumbents[0]?.value) ?? "—",
    };

    stream.startStream({
      url: "/api/generate",
      body: {
        type: "deal_simulation",
        account: ctx.account,
        competitors,
        context: `Entry point: ${ctx.entryPoint}\nChampion: ${ctx.champion}\nIncumbent: ${ctx.incumbent}`,
      },
    });
  }, [account, entryPoint, champion, incumbent, entryPoints, champions, incumbents, competitors, stream]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="space-y-8"
    >
      <SectionHeader
        title="Live Enterprise Deal Simulation"
        subtitle="Select account, entry point, champion, incumbent — get pilot motion, stakeholder sequence, objections, expansion path"
      />

      <div className="rounded-2xl border border-accent/20 bg-accent/[0.03] p-6">
        <p className="text-[11px] font-medium uppercase tracking-wider text-text-muted mb-4">
          Configure simulation
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="flex items-center gap-2 mb-2 text-[11px] font-medium text-text-secondary">
              <Building2 className="h-3.5 w-3.5" />
              Account
            </label>
            <select
              value={accountId}
              onChange={(e) => {
                setAccountId(e.target.value);
                setEntryPoint("");
                setChampion("");
                setIncumbent("");
              }}
              className="w-full rounded-lg border border-surface-border/60 bg-surface-elevated/60 px-3 py-2.5 text-[13px] text-text-primary focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
            >
              {accounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 mb-2 text-[11px] font-medium text-text-secondary">
              <Target className="h-3.5 w-3.5" />
              Entry point
            </label>
            <select
              value={entryPoint || entryPoints[0]?.value}
              onChange={(e) => setEntryPoint(e.target.value)}
              className="w-full rounded-lg border border-surface-border/60 bg-surface-elevated/60 px-3 py-2.5 text-[13px] text-text-primary focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
            >
              {entryPoints.map((ep) => (
                <option key={ep.value} value={ep.value}>
                  {ep.label.length > 50 ? ep.label.slice(0, 50) + "…" : ep.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 mb-2 text-[11px] font-medium text-text-secondary">
              <User className="h-3.5 w-3.5" />
              Champion
            </label>
            <select
              value={champion || champions[0]?.value}
              onChange={(e) => setChampion(e.target.value)}
              className="w-full rounded-lg border border-surface-border/60 bg-surface-elevated/60 px-3 py-2.5 text-[13px] text-text-primary focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
            >
              {champions.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 mb-2 text-[11px] font-medium text-text-secondary">
              <Shield className="h-3.5 w-3.5" />
              Incumbent
            </label>
            <select
              value={incumbent || incumbents[0]?.value}
              onChange={(e) => setIncumbent(e.target.value)}
              className="w-full rounded-lg border border-surface-border/60 bg-surface-elevated/60 px-3 py-2.5 text-[13px] text-text-primary focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
            >
              {incumbents.map((i) => (
                <option key={i.value} value={i.value}>
                  {i.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={runSimulation}
            disabled={stream.isStreaming}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-medium transition-colors",
              "bg-accent text-white hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <Play className="h-4 w-4" />
            {stream.isStreaming ? "Generating…" : "Run simulation"}
          </button>
        </div>
      </div>

      {(stream.content || stream.isStreaming) && (
        <div className="rounded-2xl border border-surface-border/50 bg-surface-elevated/40 overflow-hidden">
          <StreamingContent
            content={stream.content}
            isStreaming={stream.isStreaming}
            onRegenerate={stream.isStreaming ? undefined : runSimulation}
          />
        </div>
      )}
    </motion.div>
  );
}
