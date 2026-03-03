import Link from 'next/link';
import { Search, Home, PlayCircle } from 'lucide-react';
import { cn } from './GlassCard';

export function GlassNav() {
  return (
    <nav className="fixed top-0 w-full z-50 p-4">
      <div className={cn(
        'liquid-glass max-w-5xl mx-auto rounded-full px-6 py-3 flex items-center justify-between'
      )}>
        <Link href="/" className="text-xl font-bold text-glow-cyan flex items-center gap-2">
          <PlayCircle className="w-6 h-6 text-cyan-400" />
          <span>Aether<span className="text-white/50 font-light">Anime</span></span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-cyan-400 transition-colors">Home</Link>
          <Link href="/trending" className="text-sm font-medium hover:text-cyan-400 transition-colors">Trending</Link>
          <Link href="/search" className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <Search className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}