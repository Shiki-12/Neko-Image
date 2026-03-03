import axios from 'axios';
import { AnimeImage } from './types';

export const api = axios.create({
  baseURL: 'https://api.nekosia.cat/api/v1',
  timeout: 10000,
});

/**
 * Fetch multiple random images concurrently from the Nekosia API.
 * Each API call returns a single image, so we use Promise.allSettled
 * to fetch `count` images in parallel.
 */
export const getRandomImages = async (
  count: number = 9,
  category: string = 'catgirl'
): Promise<AnimeImage[]> => {
  try {
    const promises = Array.from({ length: count }).map(() =>
      api.get(`/images/${category}`)
    );

    const responses = await Promise.allSettled(promises);

    const images: AnimeImage[] = [];

    responses.forEach((response, index) => {
      if (response.status === 'fulfilled') {
        const data = response.value.data;

        const imageUrl =
          data.image?.original?.url ||
          data.image?.compressed?.url ||
          data.image?.url ||
          data.url ||
          data.image;

        const mainColor = data.colors?.main || null;
        const tags: string[] = data.tags || [];

        if (imageUrl && typeof imageUrl === 'string') {
          images.push({
            id: data.id || `neko-${Date.now()}-${index}`,
            url: imageUrl,
            category: data.category || category,
            colors: mainColor,
            tags,
          });
        }
      }
    });

    return images;
  } catch (error) {
    console.error('Failed to fetch images from Nekosia API:', error);
    return [];
  }
};