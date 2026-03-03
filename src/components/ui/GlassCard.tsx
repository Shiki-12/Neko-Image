import { ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}

export function GlassCard({ children, className, interactive = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        'liquid-glass rounded-2xl overflow-hidden',
        interactive && 'liquid-glass-hover cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}