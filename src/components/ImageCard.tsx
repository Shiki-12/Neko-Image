'use client';

import { useState } from 'react';
import { AnimeImage } from '@/lib/types';

interface ImageCardProps {
    image: AnimeImage;
    index: number;
}

export default function ImageCard({ image, index }: ImageCardProps) {
    const [downloading, setDownloading] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleDownload = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (downloading) return;

        setDownloading(true);
        try {
            // Always download from the original full-res URL
            const res = await fetch(`/api/download?url=${encodeURIComponent(image.url)}`);
            if (!res.ok) throw new Error('Download failed');

            const blob = await res.blob();
            const blobUrl = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = `nekowalls-${image.id}.${blob.type.includes('png') ? 'png' : blob.type.includes('webp') ? 'webp' : 'jpg'}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(blobUrl);
        } catch (err) {
            console.error('Download error:', err);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div
            className="image-card animate-fade-in-up group"
            style={{ animationDelay: `${index * 70}ms` }}
        >
            {/* Aspect ratio container */}
            <div style={{ position: 'relative', aspectRatio: '3/4', width: '100%', overflow: 'hidden', backgroundColor: '#1f2937' }}>

                {/* Pulsating skeleton — visible until the image loads */}
                {!imageLoaded && (
                    <div
                        className="shimmer-placeholder"
                        style={{
                            position: 'absolute',
                            inset: 0,
                            zIndex: 4,
                        }}
                    />
                )}

                {/* Standard Image Tag */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={image.url}
                    alt={image.tags?.slice(0, 3).join(', ') || 'Anime catgirl wallpaper'}
                    loading={index < 3 ? "eager" : "lazy"}
                    onLoad={() => setImageLoaded(true)}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        opacity: imageLoaded ? 1 : 0,
                        transition: 'opacity 0.5s ease-in-out',
                    }}
                />

                {/* Bottom gradient overlay — visible on hover */}
                <div
                    className="card-overlay"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent 60%)',
                        opacity: 0,
                        transition: 'opacity 0.5s ease',
                        zIndex: 1,
                        pointerEvents: 'none',
                    }}
                />

                {/* Download button — visible on hover */}
                <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="card-download-btn"
                    title="Download wallpaper"
                    style={{
                        position: 'absolute',
                        top: '0.75rem',
                        left: '0.75rem',
                        zIndex: 5,
                        width: '2.25rem',
                        height: '2.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '0.5rem',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        background: 'rgba(0, 0, 0, 0.55)',
                        backdropFilter: 'blur(12px)',
                        color: 'white',
                        cursor: downloading ? 'wait' : 'pointer',
                        opacity: 0,
                        transition: 'all 0.35s ease',
                    }}
                >
                    {downloading ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                    ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                    )}
                </button>

                {/* Tags — visible on hover */}
                {image.tags && image.tags.length > 0 && (
                    <div
                        className="card-tags"
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: '1rem',
                            zIndex: 3,
                            opacity: 0,
                            transform: 'translateY(8px)',
                            transition: 'all 0.4s ease',
                        }}
                    >
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                            {image.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    style={{
                                        padding: '0.25rem 0.5rem',
                                        fontSize: '0.625rem',
                                        fontWeight: 500,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        borderRadius: '9999px',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        backdropFilter: 'blur(8px)',
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Color accent dot */}
                {image.colors && (
                    <div
                        className="card-color-dot"
                        style={{
                            position: 'absolute',
                            top: '0.75rem',
                            right: '0.75rem',
                            width: '0.75rem',
                            height: '0.75rem',
                            borderRadius: '50%',
                            zIndex: 3,
                            boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.2)',
                            backgroundColor: image.colors,
                            opacity: 0,
                            transition: 'opacity 0.4s ease',
                        }}
                    />
                )}
            </div>
        </div>
    );
}