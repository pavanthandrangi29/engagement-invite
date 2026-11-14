import type { CSSProperties } from 'react';

/** Stagger index for entrance animations (consumed as var(--i) in CSS). */
export const si = (i: number) => ({ '--i': i }) as unknown as CSSProperties;
