"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight, BriefcaseBusiness, Crosshair, Users } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { MetricCard } from "@/components/ui/metric-card";
import { ClaudeSparkle } from "@/components/ui/claude-logo";
import type { Account, AccountSignal, Competitor, ExecutionItem, Stakeholder } from "@/types";

interface OverviewProps {
  account: Account;
  competitors: Competitor[];
  signals: AccountSignal[];
  stakeholders: Stakeholder[];
  executionItems: ExecutionItem[];
  pipelineTarget: number;
  currentRecommendation: string;
}

export function Overview({
  account,
  competitors,
  signals,
  stakeholders,
  executionItems,
  pipelineTarget,
  currentRecommendation,
}: OverviewProps) {
  const topCompetitor = [...competitors].sort((a, b) => b.accountRiskLevel - a.accountRiskLevel)[0];
  const champion = stakeholders.find((stakeholder) => stakeholder.stance === "champion");
  const championCount = stakeholders.filter((stakeholder) => stakeholder.stance === "champion" || stakeholder.stance === "ally").length;
  const blockedCount = executionItems.filter((item) => item.status === "blocked").length;
  const thisWeek = executionItems.filter((item) => item.status === "in_progress" || item.status === "ready").slice(0, 3);
  const firstDecision = executionItems.find((item) => item.phase === "Land");
  const expansionItem = executionItems.find((item) => item.phase === "Expansion");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="space-y-10 sm:space-y-12"
    >
      <section className="space-y-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-text-faint">
          George Trosley · Enterprise GTM Artifact
        </p>
        <div className="max-w-4xl space-y-3">
          <h1 className="max-w-5xl text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            How I&apos;d build pipeline and expansion for Claude Enterprise inside {account.name}
          </h1>
          <p className="max-w-3xl text-[16px] leading-relaxed text-text-secondary sm:text-[18px]">
            This prototype is meant to show how I think about creating demand, landing a controlled first pilot,
            navigating security and procurement, and expanding Claude inside large enterprise accounts.
          </p>
          <p className="max-w-3xl text-[14px] leading-relaxed text-text-muted">
            The point is not AI future messaging. The point is deal mechanics: first wedge, champion path,
            pilot design, executive alignment, competitive displacement, and the expansion story that follows.
          </p>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Modeled pipeline"
          value={`$${pipelineTarget.toFixed(2)}M`}
          subtitle="Combined land motion plus near-term expansion path"
        />
        <MetricCard
          label="First pilot"
          value={`$${account.estimatedLandValue.toFixed(2)}M`}
          subtitle={account.firstWedge}
        />
        <MetricCard
          label="Expansion path"
          value={`$${account.estimatedExpansionValue.toFixed(2)}M`}
          subtitle={account.topExpansionPaths[0]}
        />
        <MetricCard
          label="Deal coverage"
          value={`${championCount} threads`}
          subtitle={`${blockedCount} blocker${blockedCount === 1 ? "" : "s"} need to be actively managed`}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_380px]">
        <section className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5 sm:p-6">
          <SectionHeader
            title="How I&apos;d run this account"
            subtitle="The capture-plan view: how I&apos;d create urgency, who I&apos;d build with, what pilot I&apos;d land, and how I&apos;d expand."
          />
          <div className="grid gap-4 xl:grid-cols-2">
            <div className="rounded-[22px] border border-white/8 bg-black/10 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.12em] text-text-faint">Land motion</p>
              <p className="mt-3 text-[15px] font-medium text-text-primary">{account.firstWedge}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">
                I would keep the first sale narrow, measurable, and easy to sponsor internally. The goal is not to sell
                the whole platform first. The goal is to win a wedge that creates permission to expand.
              </p>
            </div>

            <div className="rounded-[22px] border border-white/8 bg-black/10 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.12em] text-text-faint">Champion building</p>
              <p className="mt-3 text-[15px] font-medium text-text-primary">
                {champion?.title ?? "Likely functional champion"}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">
                {champion?.note ?? "I would look for the operator with the most pain, the strongest urgency, and the most to gain from a successful pilot."}
              </p>
            </div>

            <div className="rounded-[22px] border border-white/8 bg-black/10 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.12em] text-text-faint">Pilot strategy</p>
              <p className="mt-3 text-[15px] font-medium text-text-primary">
                {firstDecision?.title ?? "Define the first pilot"}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">
                {firstDecision?.detail ?? "I would define success criteria, owners, timeline, and the exact workflow before asking for broad executive support."}
              </p>
            </div>

            <div className="rounded-[22px] border border-white/8 bg-black/10 px-4 py-4">
              <p className="text-[10px] uppercase tracking-[0.12em] text-text-faint">Expansion path</p>
              <p className="mt-3 text-[15px] font-medium text-text-primary">
                {expansionItem?.title ?? account.topExpansionPaths[0]}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">
                I would name the second motion early so leadership sees this as a wedge into broader adoption, not a one-off tooling experiment.
              </p>
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-[28px] border border-claude-coral/15 bg-claude-coral/[0.05] p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <ClaudeSparkle size={14} className="text-claude-coral" />
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-claude-coral/70">
                My current take
              </p>
            </div>
            <p className="mt-4 text-[16px] leading-relaxed text-text-primary">
              {currentRecommendation}
            </p>
          </div>

          <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5">
            <div className="flex items-center gap-2 text-text-secondary">
              <Crosshair className="h-4 w-4 text-claude-coral/75" strokeWidth={1.8} />
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-text-faint">
                Competitive displacement
              </p>
            </div>
            <p className="mt-4 text-[14px] font-medium text-text-primary">
              {topCompetitor?.name ?? "Incumbent platform pressure"}
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">
              {topCompetitor
                ? `${topCompetitor.strengthAreas.slice(0, 2).join(" · ")}`
                : "The deal is most at risk when incumbent platforms make the customer default to convenience over quality."}
            </p>
            <p className="mt-3 text-[12px] leading-relaxed text-text-muted">
              I would not try to out-market the incumbent. I would force a narrower comparison around model quality,
              enterprise governance, and the specific workflow where Claude wins.
            </p>
          </div>
        </aside>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <BriefcaseBusiness className="h-4 w-4 text-claude-coral/75" strokeWidth={1.8} />
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-text-faint">
              My first 30 days
            </p>
          </div>
          <div className="mt-5 space-y-3">
            {thisWeek.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 rounded-[22px] border border-white/8 bg-black/10 px-4 py-4"
              >
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-claude-coral/70" strokeWidth={1.8} />
                <div className="min-w-0">
                  <p className="text-[14px] font-medium text-text-primary">{item.title}</p>
                  <p className="mt-1 text-[12px] text-text-muted">
                    {item.owner} · {item.dueLabel}
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-claude-coral/75" strokeWidth={1.8} />
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-text-faint">
              Risks I&apos;d actively close
            </p>
          </div>
          <div className="mt-5 space-y-3">
            {account.topBlockers.slice(0, 3).map((blocker) => (
              <div
                key={blocker}
                className="rounded-[22px] border border-white/8 bg-black/10 px-4 py-4"
              >
                <p className="text-[13px] leading-relaxed text-text-secondary">{blocker}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-[22px] border border-white/8 bg-black/10 px-4 py-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-claude-coral/75" strokeWidth={1.8} />
              <p className="text-[12px] font-medium text-text-primary">Executive path I&apos;d run</p>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">
              Use {account.executiveSponsors.slice(0, 2).join(" and ")} to frame the first pilot as a safe wedge,
              not a broad platform replacement.
            </p>
          </div>
        </section>
      </div>

      <section className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5 sm:p-6">
        <SectionHeader
          title="Account hypotheses I would pressure-test"
          subtitle="These are not claimed facts from a live CRM. They are the initial hypotheses I would bring into discovery, stakeholder mapping, and the first pilot cycle."
        />
        <div className="space-y-4">
          {signals.slice(0, 3).map((signal) => (
            <div
              key={signal.id}
              className="rounded-[22px] border border-white/8 bg-black/10 px-4 py-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/8 bg-white/[0.04] px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-text-faint">
                  {signal.priority}
                </span>
                <span className="text-[11px] text-text-faint">
                  {signal.sourceLabel} · {signal.sourceFreshness}
                </span>
              </div>
              <p className="mt-3 text-[15px] font-medium text-text-primary">{signal.title}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">
                {signal.summary}
              </p>
              <p className="mt-3 text-[12px] leading-relaxed text-claude-coral/80">
                {signal.recommendedAction}
              </p>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
