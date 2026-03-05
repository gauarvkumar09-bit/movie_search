"use client";
import { useState } from 'react';
import MovieCard from './components/MovieCard';
import AIInsight from './components/AIInsight';

export default function MovieSearch() {
  const [imdbId, setImdbId] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    // Basic Validation: Ensure field is filled 
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

      // Graceful Error Handling [cite: 30, 83]
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
      {/* Search Input Section [cite: 24] */}
      <div className="max-w-xl mx-auto mb-10 flex flex-col gap-4">
        <div className="flex gap-2">
          <input 
            className="flex-1 bg-slate-900 border border-slate-700 p-4 rounded-xl outline-none focus:border-indigo-500 transition-all"
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
        
        {/* Error Message Display  */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}
      </div>

      {/* Movie Details Display [cite: 16-22, 27] */}
      {data && data.Response === "True" && (
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <MovieCard data={data} />
          <AIInsight summary={data.aiSummary} sentiment={data.sentimentClass} />
        </div>
      )}

      {/* Loading Skeleton Placeholder */}
      {loading && (
        <div className="max-w-4xl mx-auto h-64 bg-slate-900/50 animate-pulse rounded-3xl border border-slate-800 flex items-center justify-center">
          <p className="text-slate-500">Analyzing movie data...</p>
        </div>
      )}
    </main>
  );
}