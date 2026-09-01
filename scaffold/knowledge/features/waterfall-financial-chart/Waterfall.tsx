'use client';

import React from 'react';
import { motion } from 'motion/react';
import { SPRINGS } from '../../primitives/utils/spring-vocabulary/springs';

export interface WaterfallStep {
  key: string;
  label: string;
  value: number;
  tone: 'inflow' | 'deduction' | 'retained';
}

export interface WaterfallProps {
  gross: number;
  steps: WaterfallStep[];
  retained: number;
  currencyPrefix?: string;
  onSelectStep?: (key: string) => void;
}

export function Waterfall({
  gross,
  steps,
  retained,
  currencyPrefix = '$',
  onSelectStep,
}: WaterfallProps) {
  let cumulative = gross;
  const bars = [
    { key: 'gross', label: 'Gross Inflow', start: 0, end: gross, value: gross, tone: 'inflow' as const },
    ...steps.map((s) => {
      const start = cumulative - s.value;
      const end = cumulative;
      cumulative = start;
      return { key: s.key, label: s.label, start, end, value: s.value, tone: s.tone };
    }),
    { key: 'retained', label: 'Net Retained', start: 0, end: retained, value: retained, tone: 'retained' as const },
  ];

  const maxVal = Math.max(gross, 1);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${bars.length}, 1fr)`, gap: 8, height: 160, alignItems: 'end' }}>
        {bars.map((bar) => {
          const heightPct = Math.max(4, ((bar.end - bar.start) / maxVal) * 100);
          const bottomPct = (bar.start / maxVal) * 100;
          const bg =
            bar.tone === 'inflow'
              ? 'var(--accent, #F2C14E)'
              : bar.tone === 'retained'
                ? 'var(--positive, #30D158)'
                : 'rgba(255, 69, 58, 0.75)';

          return (
            <div
              key={bar.key}
              onClick={() => onSelectStep?.(bar.key)}
              style={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                alignItems: 'flex-end',
                cursor: onSelectStep ? 'pointer' : 'default',
              }}
            >
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={SPRINGS.SETTLE}
                style={{
                  position: 'absolute',
                  bottom: `${bottomPct}%`,
                  height: `${heightPct}%`,
                  width: '100%',
                  borderRadius: 6,
                  background: bg,
                  transformOrigin: 'bottom center',
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Labels */}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${bars.length}, 1fr)`, gap: 8, textAlign: 'center' }}>
        {bars.map((bar) => (
          <div key={bar.key} style={{ fontSize: 11, color: 'var(--l3, rgba(235,235,245,0.38))', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {bar.label}
          </div>
        ))}
      </div>
    </div>
  );
}
