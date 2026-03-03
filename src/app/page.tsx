import { getTrendingAnime, getRecentEpisodes } from '@/lib/api';
import { AnimeHero } from '@/components/anime/AnimeHero';
import { AnimeCard } from '@/components/anime/AnimeCard';
import { GlassNav } from '@/components/ui/GlassNav';

// Memaksa halaman dinamis agar selalu memuat data terbaru
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch data secara paralel agar lebih cepat
  const [trending, recent] = await Promise.all([
    getTrendingAnime().catch(() => []),
    getRecentEpisodes().catch(() => [])
  ]);

  return (
    <main className="min-h-screen relative pb-20">
      <GlassNav />
      
      {/* Hero Section */}
      <AnimeHero animes={trending.slice(0, 5)} />

      <div className="max-w-5xl mx-auto px-6 mt-12 space-y-20 z-10 relative">
        
        {/* Trending Section */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-white text-glow-cyan">Trending Portal</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-[var(--glass-border)] to-transparent" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {trending.slice(0, 10).map((anime, index) => (
              <AnimeCard key={`trending-${anime.id}`} anime={anime} index={index} />
            ))}
          </div>
        </section>

        {/* Latest Releases Section */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-white text-glow-cyan">Baru Saja Terhubung</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-[var(--glass-border)] to-transparent" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {recent.slice(0, 10).map((anime, index) => (
              <AnimeCard key={`recent-${anime.id}`} anime={anime} index={index} />
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}