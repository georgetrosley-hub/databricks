"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Scale,
  Cloud,
  Sparkles,
  Database,
  ArrowRight,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { getAccountIntelligence } from "@/data/account-intelligence";
import type { Account } from "@/types";

interface AccountIntelligenceProps {
  account: Account;
}

export function AccountIntelligence({ account }: AccountIntelligenceProps) {
  const intel = getAccountIntelligence(account.id);

  if (!intel) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-2xl border border-surface-border/50 bg-surface-elevated/40 p-8 text-center"
      >
        <p className="text-[14px] text-text-muted">
          No structured intelligence for this account yet.
        </p>
      </motion.div>
    );
  }

  const sections = [
    {
      icon: Building2,
      label: "Strategic initiatives",
      items: intel.strategicInitiatives,
    },
    {
      icon: Users,
      label: "Recent leadership",
      items: intel.recentLeadershipChanges ?? [],
    },
    {
      icon: Scale,
      label: "Regulatory pressures",
      items: intel.regulatoryPressures,
    },
    {
      icon: ArrowRight,
      label: "Digital transformation",
      items: intel.digitalTransformation,
    },
    {
      icon: Cloud,
      label: "Cloud alignment",
      items: [`Primary: ${intel.cloudAlignment}`],
    },
    {
      icon: Database,
      label: "Data architecture signals",
      items: intel.dataArchitectureSignals,
    },
    {
      icon: Sparkles,
      label: "AI/ML initiatives",
      items: intel.aiMlInitiatives,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="space-y-8"
    >
      <SectionHeader
        title="Account intelligence"
        subtitle={`Research maintained for ${account.name}`}
      />

      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        {sections.map(({ icon: Icon, label, items }) =>
          items.length > 0 ? (
            <div
              key={label}
              className="rounded-2xl border border-surface-border/50 bg-surface-elevated/40 p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon className="h-4 w-4 text-accent/80" strokeWidth={1.8} />
                <h3 className="text-[12px] font-semibold uppercase tracking-wider text-text-muted">
                  {label}
                </h3>
              </div>
              <ul className="space-y-2">
                {items.map((item, j) => (
                  <li
                    key={j}
                    className="text-[13px] text-text-secondary leading-relaxed"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null
        )}
      </div>
    </motion.div>
  );
}
