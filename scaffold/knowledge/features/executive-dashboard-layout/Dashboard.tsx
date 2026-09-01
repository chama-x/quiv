'use client';

import React, { type ReactNode } from 'react';
import { motion } from 'motion/react';
import { SPRINGS } from '../../primitives/utils/spring-vocabulary/springs';

export interface DashboardProps {
  hero: ReactNode;
  allocationBar?: ReactNode;
  statGrid: ReactNode;
  attentionItems?: ReactNode;
  activityFeed?: ReactNode;
}

export function ExecutiveDashboardLayout({
  hero,
  allocationBar,
  statGrid,
  attentionItems,
  activityFeed,
}: DashboardProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
      {/* Hero Card */}
      <motion.section
        layout
        layoutId="dashboard-hero"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRINGS.SETTLE}
      >
        {hero}
      </motion.section>

      {/* Allocation / Cash Split Bar */}
      {allocationBar && (
        <section>
          {allocationBar}
        </section>
      )}

      {/* Primary KPI Grid */}
      <section>
        {statGrid}
      </section>

      {/* Blocker & Attention Queue */}
      {attentionItems && (
        <section>
          {attentionItems}
        </section>
      )}

      {/* Real-time Activity Feed */}
      {activityFeed && (
        <section>
          {activityFeed}
        </section>
      )}
    </div>
  );
}
