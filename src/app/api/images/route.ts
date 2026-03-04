import { NextRequest, NextResponse } from 'next/server';
import { getRandomImages } from '@/lib/api';

export async function GET(request: NextRequest) {
    const count = parseInt(request.nextUrl.searchParams.get('count') || '9', 10);
    const category = request.nextUrl.searchParams.get('category') || 'catgirl';

    const images = await getRandomImages(
        Math.min(count, 18), // cap at 18 to avoid abuse
        category
    );

    return NextResponse.json(images);
}
