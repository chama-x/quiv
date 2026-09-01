'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useMotionValue, useMotionValueEvent, animate, useReducedMotion } from 'motion/react';

export interface NumProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  animate?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function Num({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  animate: shouldAnimate = true,
  className = '',
  style = {},
}: NumProps) {
  const reduce = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(value);
  const motionVal = useMotionValue(value);
  const prevVal = useRef(value);

  useEffect(() => {
    if (reduce || !shouldAnimate) {
      setDisplayValue(value);
      return;
    }
    const controls = animate(motionVal, value, {
      type: 'spring',
      bounce: 0.1,
      duration: 0.5,
    });
    return () => controls.stop();
  }, [value, reduce, shouldAnimate, motionVal]);

  useMotionValueEvent(motionVal, 'change', (latest) => {
    setDisplayValue(latest);
  });

  const formatted = displayValue.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span
      className={className}
      style={{
        fontVariantNumeric: 'tabular-nums',
        fontFeatureSettings: '"tnum" 1',
        display: 'inline-flex',
        alignItems: 'baseline',
        ...style,
      }}
    >
      {prefix && <span style={{ opacity: 0.7, marginRight: 2 }}>{prefix}</span>}
      <span>{formatted}</span>
      {suffix && <span style={{ opacity: 0.7, marginLeft: 2 }}>{suffix}</span>}
    </span>
  );
}
