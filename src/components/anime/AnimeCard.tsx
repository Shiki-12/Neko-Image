"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Anime } from '@/lib/types';
import { GlassCard } from '../ui/GlassCard';

interface AnimeCardProps {
  anime: Anime;
  index: number;
}

export function AnimeCard({ anime, index }: AnimeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }} // Stagger animation
    >
      <Link href={`/anime/${anime.id}`}>
        <GlassCard 
          interactive 
          className="relative aspect-[2/3] group overflow-hidden"
        >
          {/* Base Image */}
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
            <Image
              src={anime.image}
              alt={anime.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            {/* Dark gradient overlay at the bottom for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          {/* Title (Always visible at bottom) */}
          <div className="absolute bottom-0 left-0 w-full p-4 z-10 transition-transform duration-500 group-hover:translate-y-full">
            <h3 className="text-sm font-semibold text-white line-clamp-2 text-glow-cyan">
              {anime.title}
            </h3>
          </div>

          {/* Hover Reveal Content (Glass Overlay) */}
          <motion.div 
            className="absolute inset-0 liquid-glass flex flex-col justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
            initial={false}
          >
            <h3 className="text-md font-bold text-white mb-2">{anime.title}</h3>
            {anime.releaseDate && (
              <p className="text-xs text-cyan-400 mb-2 font-mono">{anime.releaseDate}</p>
            )}
            <p className="text-xs text-white/80 line-clamp-4 leading-relaxed">
              Klik untuk masuk ke portal dan mulai menonton.
            </p>
          </motion.div>
        </GlassCard>
      </Link>
    </motion.div>
  );
}