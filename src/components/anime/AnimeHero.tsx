"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Anime } from '@/lib/types';
import { GlassButton } from '../ui/GlassButton';
import { GlassBadge } from '../ui/GlassBadge';
import { Play } from 'lucide-react';

export function AnimeHero({ animes }: { animes: Anime[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-cycle setiap 6 detik
  useEffect(() => {
    if (!animes || animes.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.min(animes.length, 5));
    }, 6000);
    return () => clearInterval(timer);
  }, [animes]);

  if (!animes || animes.length === 0) return null;

  const currentAnime = animes[currentIndex];

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden rounded-b-[3rem]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentAnime.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={currentAnime.image}
            alt={currentAnime.title}
            fill
            className="object-cover opacity-60"
            priority
          />
          {/* Void Gradients for blending */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center max-w-5xl mx-auto px-6 pt-20 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={`info-${currentAnime.id}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl"
          >
            <GlassBadge className="mb-4 inline-block">Trending #1</GlassBadge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-glow-cyan leading-tight">
              {currentAnime.title}
            </h1>
            <p className="text-white/70 text-lg mb-8 line-clamp-3">
              Jelajahi dunia tanpa batas. Portal ini telah terbuka, bersiaplah untuk menyelami cerita yang memukau.
            </p>
            <div className="flex gap-4">
              <Link href={`/anime/${currentAnime.id}`}>
                <GlassButton className="flex items-center gap-2 bg-cyan-500/20">
                  <Play className="w-5 h-5" fill="currentColor" />
                  Watch Now
                </GlassButton>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}