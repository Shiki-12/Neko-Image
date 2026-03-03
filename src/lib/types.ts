export interface Anime {
  id: string;
  title: string;
  image: string;
  releaseDate?: string;
  description?: string;
  genres?: string[];
  rating?: number;
  status?: string;
  totalEpisodes?: number;
  type?: string;
}

export interface Episode {
  id: string;
  number: number;
  title?: string;
}

export interface VideoSource {
  url: string;
  quality: string;
  isM3U8: boolean;
}

export interface SearchResponse {
  currentPage: number;
  hasNextPage: boolean;
  results: Anime[];
}