"use client";

import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { VideoSource } from '@/lib/types';
import { GlassCard } from '../ui/GlassCard';
import { Play, Pause, Maximize, Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
  sources: VideoSource[];
}

export function VideoPlayer({ sources }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Cari sumber HLS (m3u8) atau fallback ke sumber pertama
  const defaultSource = sources.find(s => s.isM3U8) || sources[0];

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !defaultSource) return;

    let hls: Hls;

    if (Hls.isSupported() && defaultSource.isM3U8) {
      hls = new Hls({
        capLevelToPlayerSize: true, // Optimasi kualitas berdasarkan ukuran layar
      });
      hls.loadSource(defaultSource.url);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Untuk Safari yang mendukung HLS secara native
      video.src = defaultSource.url;
    } else {
      // Fallback untuk MP4 biasa
      video.src = defaultSource.url;
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [defaultSource]);

  // Fungsi Kontrol Kustom
  const togglePlay = () => {
    if (videoRef.current?.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div ref={containerRef} className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden group">
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      {/* Liquid Glass Controls Overlay - Muncul saat di-hover */}
      <div className="absolute bottom-0 left-0 w-full p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/80 to-transparent flex items-end">
        <GlassCard className="w-full px-6 py-3 flex items-center justify-between !bg-white/5 border-white/10">
          <div className="flex items-center gap-6">
            <button onClick={togglePlay} className="text-white hover:text-cyan-400 transition-colors">
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" fill="currentColor" />}
            </button>
            <button onClick={toggleMute} className="text-white hover:text-cyan-400 transition-colors">
              {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>
          </div>
          
          <button onClick={toggleFullscreen} className="text-white hover:text-cyan-400 transition-colors">
            <Maximize className="w-6 h-6" />
          </button>
        </GlassCard>
      </div>
    </div>
  );
}