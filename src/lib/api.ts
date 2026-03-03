import axios from 'axios';
import { Anime, SearchResponse, VideoSource, Episode } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://animeapi.rymax.me';

export const api = axios.create({
  baseURL: `${BASE_URL}/anime/gogoanime`, 
  timeout: 10000,
});

export const getTrendingAnime = async (): Promise<Anime[]> => {
  const { data } = await api.get('/top-airing');
  return data.results;
};

export const getRecentEpisodes = async (): Promise<Anime[]> => {
  const { data } = await api.get('/recent-episodes');
  return data.results;
};

export const getAnimeDetails = async (id: string): Promise<Anime & { episodes: Episode[] }> => {
  const { data } = await api.get(`/info/${id}`);
  return data;
};

export const searchAnime = async (query: string, page = 1): Promise<SearchResponse> => {
  const { data } = await api.get(`/${query}?page=${page}`);
  return data;
};

export const getStreamingLinks = async (episodeId: string): Promise<VideoSource[]> => {
  const { data } = await api.get(`/watch/${episodeId}`);
  return data.sources;
};