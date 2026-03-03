import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from './GlassCard';

export const GlassButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'liquid-glass px-6 py-2 rounded-full font-medium text-white/90 transition-all duration-300',
          'hover:bg-white/10 hover:text-white hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]',
          'active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
GlassButton.displayName = 'GlassButton';