import ImageGrid from '@/components/ImageGrid';
import Pagination from '@/components/Pagination';
import { redirect } from 'next/navigation';

// Force dynamic rendering so each page visit gets a fresh page key
export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ num: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { num } = await params;
    return {
        title: `Page ${num} — NekoWalls`,
        description: `Browse anime catgirl wallpapers — page ${num}`,
    };
}

export default async function GalleryPage({ params }: PageProps) {
    const { num } = await params;
    const pageNumber = parseInt(num, 10);

    // Validate page number
    if (isNaN(pageNumber) || pageNumber < 1) {
        redirect('/page/1');
    }

    return (
        <main style={{ minHeight: '100vh' }}>
            {/* Header */}
            <header style={{ position: 'relative', paddingTop: '3rem', paddingBottom: '2rem', textAlign: 'center' }}>
                <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 1rem' }}>
                    {/* Logo / Title */}
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', fontWeight: 900, letterSpacing: '-0.025em' }}>
                        <span className="text-glow-cyan" style={{ color: 'var(--neon-cyan)' }}>
                            Neko
                        </span>
                        <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Walls</span>
                    </h1>
                    <p style={{ marginTop: '0.75rem', color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.05em', maxWidth: '28rem', margin: '0.75rem auto 0' }}>
                        Curated anime catgirl wallpapers — fresh picks on every page
                    </p>

                    {/* Decorative line */}
                    <div style={{
                        marginTop: '1.5rem',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: '6rem',
                        height: '1px',
                        background: 'linear-gradient(to right, transparent, rgba(0, 240, 255, 0.4), transparent)',
                    }} />
                </div>
            </header>

            {/* Gallery Grid — client-side fetching with skeleton loading */}
            <section style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
                <ImageGrid pageKey={pageNumber} />
            </section>

            {/* Pagination */}
            <section style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
                <Pagination currentPage={pageNumber} />
            </section>

            {/* Footer */}
            <footer style={{ textAlign: 'center', padding: '2rem 0', color: 'rgba(255, 255, 255, 0.2)', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                Powered by{' '}
                <a
                    href="https://nekosia.cat"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'rgba(255, 255, 255, 0.4)', textDecoration: 'none' }}
                >
                    Nekosia API
                </a>
            </footer>
        </main>
    );
}
