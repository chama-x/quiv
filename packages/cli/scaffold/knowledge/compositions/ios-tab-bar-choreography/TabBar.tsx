'use client';

import React from 'react';
import { motion, type Variants } from 'motion/react';
import { SPRINGS, TINT } from '../../primitives/utils/spring-vocabulary/springs';

export interface TabItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ isActive: boolean }>;
}

export interface TabBarProps {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
}

export function TabBar({ tabs, activeId, onChange }: TabBarProps) {
  return (
    <nav
      aria-label="Primary navigation"
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        background: 'rgba(6, 6, 7, 0.80)',
        backdropFilter: 'saturate(180%) blur(28px)',
        WebkitBackdropFilter: 'saturate(180%) blur(28px)',
        borderTop: '1px solid var(--hairline, rgba(255, 255, 255, 0.09))',
        paddingBottom: 'var(--sab, env(safe-area-inset-bottom, 0px))',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${tabs.length}, 1fr)`,
          height: 'var(--tab-h, 54px)',
        }}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              style={{
                position: 'relative',
                display: 'grid',
                placeItems: 'center',
                background: 'none',
                border: 0,
                padding: 0,
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="tabglow"
                  transition={SPRINGS.SETTLE}
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: 2,
                    width: 52,
                    height: 30,
                    borderRadius: 12,
                    pointerEvents: 'none',
                    background: 'radial-gradient(ellipse at center, var(--accent-glow, rgba(242,193,78,0.18)), transparent 72%)',
                  }}
                />
              )}

              <motion.span
                whileTap={{ scale: 0.9 }}
                transition={SPRINGS.LOCK}
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  alignContent: 'center',
                  gap: 2,
                  width: '100%',
                  height: '100%',
                }}
              >
                <Icon isActive={isActive} />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'var(--accent, #F2C14E)' : 'var(--l3, rgba(235,235,245,0.38))',
                    transition: 'color 0.24s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                >
                  {tab.label}
                </span>
              </motion.span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
