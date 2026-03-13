"use client";

import { motion } from "framer-motion";
import { Cloud, Building2, Users, Database } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { getPartnerStrategy } from "@/data/partners";
import type { Account } from "@/types";
import { cn } from "@/lib/utils";

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Cloud: Cloud,
  "System Integrator": Building2,
  Consulting: Users,
  "Data & AI Ecosystem": Database,
};

function influenceColor(influence: string) {
  switch (influence) {
    case "critical":
      return "text-accent";
    case "high":
      return "text-text-primary";
    default:
      return "text-text-muted";
  }
}

interface PartnerStrategyProps {
  account: Account;
}

export function PartnerStrategy({ account }: PartnerStrategyProps) {
  const partners = getPartnerStrategy(account.id);

  const byCategory = partners.reduce<Record<string, typeof partners>>((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {});

  const order = ["Cloud", "Data & AI Ecosystem", "System Integrator", "Consulting"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="space-y-8"
    >
      <SectionHeader
        title="Partner strategy"
        subtitle={`Cloud, SIs, and ecosystem for ${account.name}`}
      />

      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        {order.map((cat) => {
          const items = byCategory[cat];
          if (!items?.length) return null;
          const Icon = CATEGORY_ICONS[cat];

          return (
            <div
              key={cat}
              className="rounded-2xl border border-surface-border/50 bg-surface-elevated/40 p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                {Icon && <Icon className="h-4 w-4 text-accent/80" />}
                <h3 className="text-[12px] font-semibold uppercase tracking-wider text-text-muted">
                  {cat}
                </h3>
              </div>
              <ul className="space-y-3">
                {items.map((p, i) => (
                  <li
                    key={i}
                    className="flex items-start justify-between gap-3 text-[13px]"
                  >
                    <div>
                      <span className="font-medium text-text-primary">
                        {p.name}
                      </span>
                      <span className={cn("ml-2 text-[10px] uppercase", influenceColor(p.influence))}>
                        {p.influence}
                      </span>
                    </div>
                    <p className="text-text-muted text-[12px] text-right max-w-[200px]">
                      {p.role}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
