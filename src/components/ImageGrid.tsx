import { AnimeImage } from '@/lib/types';
import ImageCard from './ImageCard';

interface ImageGridProps {
    images: AnimeImage[];
}

export default function ImageGrid({ images }: ImageGridProps) {
    const gridStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        gap: '1.5rem',
        padding: '1.5rem 0',
    };

    // We'll handle responsive columns via a media-query style tag + class
    if (images.length === 0) {
        return (
            <>
                <style>{`
                    .gallery-grid {
                        display: grid;
                        grid-template-columns: repeat(1, 1fr);
                        gap: 1.5rem;
                        padding: 1.5rem 0;
                    }
                    @media (min-width: 768px) {
                        .gallery-grid { grid-template-columns: repeat(2, 1fr); }
                    }
                    @media (min-width: 1024px) {
                        .gallery-grid { grid-template-columns: repeat(3, 1fr); }
                    }
                `}</style>
                <div className="gallery-grid">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="shimmer-placeholder" style={{ aspectRatio: '3/4', borderRadius: '1rem' }} />
                    ))}
                </div>
            </>
        );
    }

    return (
        <>
            <style>{`
                .gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(1, 1fr);
                    gap: 1.5rem;
                    padding: 1.5rem 0;
                }
                @media (min-width: 768px) {
                    .gallery-grid { grid-template-columns: repeat(2, 1fr); }
                }
                @media (min-width: 1024px) {
                    .gallery-grid { grid-template-columns: repeat(3, 1fr); }
                }
            `}</style>
            <div className="gallery-grid">
                {images.map((image, index) => (
                    <ImageCard key={`${image.id}-${index}`} image={image} index={index} />
                ))}
            </div>
        </>
    );
}
