interface MovieData {
  Title: string;
  Poster: string;
  Year: string;
  Genre: string;
  imdbRating: string;
  Actors: string;
  Plot: string;
}

export default function MovieCard({ data }: { data: MovieData }) {
  return (
    <div className="flex flex-col md:flex-row bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      <div className="md:w-72 bg-slate-800">
        <img 
          src={data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/300x450?text=No+Poster"} 
          alt={data.Title} 
          className="h-full w-full object-cover" 
        />
      </div>
      <div className="p-8 flex-1">
        <h2 className="text-4xl font-bold mb-2 text-white">{data.Title}</h2>
        <p className="text-slate-400 mb-6">{data.Year} • {data.Genre} • ⭐ {data.imdbRating}</p>
        
        {/* Cast List Requirement [cite: 18, 25] */}
        <div className="mb-6">
          <h3 className="text-indigo-400 font-bold text-xs uppercase mb-2 tracking-wider">Cast</h3>
          <p className="text-slate-300">{data.Actors}</p>
        </div>

        <div>
          <h3 className="text-indigo-400 font-bold text-xs uppercase mb-2 tracking-wider">Plot Summary</h3>
          <p className="text-slate-300 text-sm leading-relaxed">{data.Plot}</p>
        </div>
      </div>
    </div>
  );
}