"use client";
import { useState } from 'react';
import MovieCard from './components/MovieCard';
import AIInsight from './components/AIInsight';

// 1. Data ka structure define karo [cite: 17-22]
interface MovieResult {
  Response: string;
  Title: string;
  Poster: string;
  Year: string;
  Genre: string;
  imdbRating: string;
  Actors: string;
  Plot: string;
  aiSummary: string;
  sentimentClass: 'Positive' | 'Mixed' | 'Negative' | string;
  Error?: string;
}

export default function MovieSearch() {
  const [imdbId, setImdbId] = useState('');
  // 2. State ko ye interface assign karo
  const [data, setData] = useState<MovieResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    if (!imdbId.trim()) {
      setError("Please enter an IMDb ID first!");
      return;
    }

    setLoading(true);
    setError('');
    setData(null);

    try {
      const res = await fetch(`/api/movie?id=${imdbId}`);
      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Failed to fetch movie details.");
      } else {
        setData(json);
      }
    } catch (err) {
      setError("Network error! Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white p-10">
      <div className="max-w-xl mx-auto mb-10 flex flex-col gap-4">
        <div className="flex gap-2">
          <input 
            className="flex-1 bg-slate-900 border border-slate-700 p-4 rounded-xl outline-none focus:border-indigo-500"
            placeholder="Enter IMDb ID (e.g. tt0133093)"
            value={imdbId}
            onChange={(e) => setImdbId(e.target.value)}
          />
          <button 
            onClick={fetchData} 
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 px-6 rounded-xl font-bold transition-all disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}
      </div>

      {/* 3. Ab TypeScript error nahi dega [cite: 69] */}
      {data && data.Response === "True" && (
        <div className="max-w-4xl mx-auto">
          <MovieCard data={data} />
          <AIInsight summary={data.aiSummary} sentiment={data.sentimentClass} />
        </div>
      )}

      {loading && (
        <div className="max-w-4xl mx-auto h-64 bg-slate-900/50 animate-pulse rounded-3xl border border-slate-800 flex items-center justify-center">
          <p className="text-slate-500">Analyzing movie data...</p>
        </div>
      )}
    </main>
  );
}