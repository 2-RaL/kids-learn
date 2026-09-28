import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Video, Clock, Award, X, Sparkles, Filter } from 'lucide-react';
import { apiUrl } from '../../config/api';
import { useAuthStore } from '../../store/authStore';

interface VideoItem {
  id: number;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string | null;
  category_id: number;
  category_name?: string;
  category_icon?: string;
  category_slug?: string;
  min_age: number;
  max_age: number;
  difficulty: 'easy' | 'medium' | 'hard';
  duration_seconds: number | null;
}

interface ParentVideosProps {
  selectedAge?: number | null;
}

export const ParentVideos: React.FC<ParentVideosProps> = ({ selectedAge }) => {
  const { token } = useAuthStore();
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState<number | 'all'>('all');

  // Video Player Modal
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  useEffect(() => {
    fetchVideos();
  }, [selectedAge, token]);

  const fetchVideos = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      let url = apiUrl('/api/parent/videos');
      if (selectedAge) {
        url += `?age=${selectedAge}`;
      }
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setVideos(data.videos || []);
        setCategories(data.categories || []);
      }
    } catch (err) {
      console.error('Fetch videos error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredVideos = videos.filter(v => {
    if (selectedCatId !== 'all' && v.category_id !== selectedCatId) return false;
    return true;
  });

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    // YouTube link handler
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return url;
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Categories */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-4 sm:p-5 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2.5">
            <span className="text-2xl">🎬</span>
            Video ilə Öyrən
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Hərəkət, artikulyasiya və sosial bacarıqları inkişaf etdirən vizual dərslər
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCatId('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCatId === 'all'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Hamısı ({videos.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCatId(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCatId === cat.id
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{cat.icon || '🎬'}</span>
              <span>{cat.name_az || cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Videos Grid */}
      {isLoading ? (
        <div className="p-12 text-center text-slate-400 font-bold text-sm">
          Videolar yüklənir...
        </div>
      ) : filteredVideos.length === 0 ? (
        <div className="bg-white/60 rounded-3xl p-12 text-center border-2 border-dashed border-slate-200">
          <div className="text-4xl mb-3">🎬</div>
          <h3 className="text-base font-extrabold text-slate-700">Heç bir video tapılmadı</h3>
          <p className="text-xs text-slate-500 mt-1">Bu kateqoriya və ya yaş üçün hələ video əlavə edilməyib.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredVideos.map((video) => (
            <motion.div
              key={video.id}
              whileHover={{ y: -4 }}
              onClick={() => setActiveVideo(video)}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Thumbnail banner */}
                <div className="relative aspect-video bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center overflow-hidden">
                  {video.thumbnail_url ? (
                    <img
                      src={video.thumbnail_url}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="text-4xl">🎬</div>
                  )}

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center group-hover:bg-black/35 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-white/90 text-sky-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Duration badge */}
                  {video.duration_seconds && (
                    <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{Math.floor(video.duration_seconds / 60)}:{String(video.duration_seconds % 60).padStart(2, '0')}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-600 border border-sky-100">
                      {video.category_name || 'Öyrədici'}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                      {video.difficulty === 'easy' ? 'Sadə' : video.difficulty === 'medium' ? 'Orta' : 'Çətin'}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-800 group-hover:text-sky-600 transition-colors line-clamp-1 mb-1.5">
                    {video.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium line-clamp-2">
                    {video.description || 'Bu videonu izləyərək yeni bacarıqlar öyrənin.'}
                  </p>
                </div>
              </div>

              {/* Bottom age pill */}
              <div className="px-4 pb-4 pt-0 flex items-center justify-between text-xs font-semibold text-slate-400">
                <span>{video.min_age}-{video.max_age} yaş</span>
                <span className="text-sky-500 font-bold group-hover:underline">İzlə ▶</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Video Modal Player */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl border border-slate-800 flex flex-col"
            >
              {/* Modal Top Bar */}
              <div className="p-4 flex items-center justify-between bg-slate-900 text-white border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold line-clamp-1">{activeVideo.title}</h3>
                  <p className="text-xs text-slate-400">{activeVideo.category_name || 'Video dərs'} • {activeVideo.min_age}-{activeVideo.max_age} yaş</p>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player Frame */}
              <div className="relative aspect-video w-full bg-black">
                {activeVideo.video_url?.includes('youtube') || activeVideo.video_url?.includes('youtu.be') ? (
                  <iframe
                    src={getEmbedUrl(activeVideo.video_url)}
                    title={activeVideo.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={activeVideo.video_url}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  >
                    Brauzeriniz video formatını dəstəkləmir.
                  </video>
                )}
              </div>

              {/* Video Info Footer */}
              <div className="p-4 bg-slate-900/90 text-white text-xs">
                <p className="text-slate-300 font-medium">{activeVideo.description}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ParentVideos;
