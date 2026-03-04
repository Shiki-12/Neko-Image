'use client';

import { useEffect, useState, useCallback } from 'react';
import { AnimeImage } from '@/lib/types';
import ImageCard from './ImageCard';

interface ImageGridProps {
    /** Used as a cache-buster to refetch when the page changes */
    pageKey: number;
}

export default function ImageGrid({ pageKey }: ImageGridProps) {
    const [images, setImages] = useState<AnimeImage[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchImages = useCallback(async () => {
        setLoading(true);
        setImages([]);
        try {
            const res = await fetch(`/api/images?count=9&category=catgirl&_t=${Date.now()}`);
            if (res.ok) {
                const data: AnimeImage[] = await res.json();
                setImages(data);
            }
        } catch (err) {
            console.error('Failed to fetch images:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchImages();
    }, [pageKey, fetchImages]);

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
                {loading
                    ? Array.from({ length: 9 }).map((_, i) => (
                        <div
                            key={`skeleton-${i}`}
                            className="shimmer-placeholder"
                            style={{ aspectRatio: '3/4', borderRadius: '1rem' }}
                        />
                    ))
                    : images.map((image, index) => (
                        <ImageCard key={`${image.id}-${index}`} image={image} index={index} />
                    ))}
            </div>
        </>
    );
}
