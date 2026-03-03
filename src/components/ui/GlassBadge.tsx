import { ReactNode } from 'react';
import { cn } from './GlassCard';

export function GlassBadge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'liquid-glass px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full text-cyan-400',
        className
      )}
    >
      {children}
    </span>
  );
}