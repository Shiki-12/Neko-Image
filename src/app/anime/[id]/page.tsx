import Image from 'next/image';
import Link from 'next/link';
import { getAnimeDetails } from '@/lib/api';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { GlassBadge } from '@/components/ui/GlassBadge';
import { PlayCircle, ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AnimeDetail({ params }: { params: { id: string } }) {
  // Mengambil detail anime berdasarkan ID dari URL
  const anime = await getAnimeDetails(params.id);

  if (!anime) return <div className="text-white p-20 text-center">Anime tidak ditemukan di portal ini.</div>;

  return (
    <main className="min-h-screen relative pb-20">
      {/* Background Cover dengan efek blur yang dramatis */}
      <div className="absolute top-0 left-0 w-full h-[60vh] -z-10 overflow-hidden">
        <Image
          src={anime.image}
          alt="Background"
          fill
          className="object-cover opacity-30 blur-2xl scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--background)]/80 to-[var(--background)]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-24">
        <Link href="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
        </Link>

        {/* Info Utama Anime */}
        <div className="flex flex-col md:flex-row gap-8 mb-16 relative z-10">
          <GlassCard className="w-48 md:w-64 shrink-0 rounded-2xl overflow-hidden aspect-[2/3] relative">
            <Image src={anime.image} alt={anime.title} fill className="object-cover" />
          </GlassCard>

          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-4">
              {anime.status && <GlassBadge>{anime.status}</GlassBadge>}
              {anime.releaseDate && <GlassBadge className="text-purple-400">{anime.releaseDate}</GlassBadge>}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-glow-cyan">
              {anime.title}
            </h1>
            
            <p className="text-white/80 leading-relaxed text-lg mb-8 max-w-3xl">
              {anime.description || "Tidak ada deskripsi yang tersedia di arsip portal ini."}
            </p>

            <div className="flex gap-4">
              <Link href={`/watch/${anime.episodes?.[0]?.id}`}>
                <GlassButton className="flex items-center gap-2 bg-cyan-500/20 px-8 py-3 text-lg">
                  <PlayCircle className="w-6 h-6" /> Mulai Menonton
                </GlassButton>
              </Link>
            </div>
          </div>
        </div>

        {/* Daftar Episode */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-white text-glow-cyan">Arsip Episode</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-[var(--glass-border)] to-transparent" />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {anime.episodes?.map((episode) => (
              <Link key={episode.id} href={`/watch/${episode.id}`}>
                <GlassCard interactive className="p-4 text-center group">
                  <span className="block text-sm text-white/50 mb-1 group-hover:text-cyan-400 transition-colors">
                    Episode
                  </span>
                  <span className="block text-2xl font-bold text-white group-hover:text-glow-cyan transition-all">
                    {episode.number}
                  </span>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}