import Link from 'next/link';

interface PaginationProps {
    currentPage: number;
}

const ChevronLeft = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
    </svg>
);

const ChevronRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

export default function Pagination({ currentPage }: PaginationProps) {
    const hasPrevious = currentPage > 1;

    return (
        <nav
            aria-label="Pagination"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.5rem',
                marginTop: '3rem',
                marginBottom: '2rem',
            }}
        >
            {/* Previous Button */}
            {hasPrevious ? (
                <Link href={`/page/${currentPage - 1}`} className="pagination-btn">
                    <ChevronLeft />
                    Previous
                </Link>
            ) : (
                <span className="pagination-btn" aria-disabled="true">
                    <ChevronLeft />
                    Previous
                </span>
            )}

            {/* Page Indicator */}
            <div
                className="liquid-glass"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.625rem 1.25rem',
                    borderRadius: '0.75rem',
                }}
            >
                <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.875rem', fontWeight: 500 }}>
                    Page
                </span>
                <span
                    className="text-glow-cyan"
                    style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--neon-cyan)' }}
                >
                    {currentPage}
                </span>
            </div>

            {/* Next Button */}
            <Link href={`/page/${currentPage + 1}`} className="pagination-btn">
                Next
                <ChevronRight />
            </Link>
        </nav>
    );
}
