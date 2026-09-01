'use client';

import React, { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export interface ScreenProps {
  id: string;
  title: string;
  subtitle?: ReactNode;
  trailing?: ReactNode;
  hero?: ReactNode;
  children: ReactNode;
  largeTitle?: boolean;
}

export function Screen({
  id,
  title,
  subtitle,
  trailing,
  hero,
  children,
  largeTitle = true,
}: ScreenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: ref });

  const navBg = useTransform(scrollY, [hero ? 120 : 34, hero ? 190 : 74], [0, 1]);
  const navTitle = useTransform(scrollY, [hero ? 140 : 40, hero ? 200 : 80], [0, 1]);
  const bigFade = useTransform(scrollY, [0, hero ? 110 : 56], [1, 0]);
  const bigLift = useTransform(scrollY, [0, 200], [0, -26]);

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--bg, #000)', overflow: 'hidden' }}>
      {/* Sticky Compact Header */}
      <header
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          paddingTop: 'var(--sat, env(safe-area-inset-top, 0px))',
          pointerEvents: 'none',
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: navBg,
            background: 'rgba(0, 0, 0, 0.74)',
            backdropFilter: 'saturate(180%) blur(24px)',
            WebkitBackdropFilter: 'saturate(180%) blur(24px)',
            borderBottom: '1px solid var(--hairline, rgba(255,255,255,0.09))',
          }}
        />
        <div
          style={{
            position: 'relative',
            height: 'var(--nav-h, 52px)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 var(--g, 20px)',
            pointerEvents: 'auto',
          }}
        >
          <motion.span style={{ opacity: navTitle, fontSize: 17, fontWeight: 600, color: 'var(--l1, #fff)' }}>
            {title}
          </motion.span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>{trailing}</div>
        </div>
      </header>

      {/* Main Scroll Container */}
      <div
        ref={ref}
        style={{
          position: 'absolute',
          inset: 0,
          overflowY: 'auto',
          overscrollBehaviorY: 'contain',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div style={{ position: 'relative' }}>
          {hero}
          {largeTitle && (
            <motion.div
              style={{
                position: 'relative',
                zIndex: 1,
                opacity: bigFade,
                y: bigLift,
                padding: `calc(var(--sat, env(safe-area-inset-top, 0px)) + ${hero ? 66 : 60}px) var(--g, 20px) 0`,
              }}
            >
              <h1 style={{ fontSize: 34, lineHeight: '41px', fontWeight: 700, letterSpacing: '-0.6px', color: 'var(--l1, #fff)' }}>
                {title}
              </h1>
              {subtitle && <div style={{ marginTop: 2, fontSize: 15, color: 'var(--l2, rgba(235,235,245,0.62))' }}>{subtitle}</div>}
            </motion.div>
          )}
        </div>
        <div
          style={{
            paddingTop: largeTitle ? 12 : 'calc(var(--sat, env(safe-area-inset-top, 0px)) + 56px)',
            paddingLeft: 'var(--g, 20px)',
            paddingRight: 'var(--g, 20px)',
            paddingBottom: 'calc(var(--tab-h, 54px) + 46px + var(--sab, env(safe-area-inset-bottom, 0px)))',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
