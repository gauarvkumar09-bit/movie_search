interface AIInsightProps {
  summary: string;
  sentiment: 'Positive' | 'Mixed' | 'Negative';
}

export default function AIInsight({ summary, sentiment }: AIInsightProps) {
  const colors = {
    Positive: "bg-green-500/20 text-green-400 border-green-500/50",
    Mixed: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
    Negative: "bg-red-500/20 text-red-400 border-red-500/50"
  };

  return (
    <div className={`mt-6 p-5 rounded-2xl border backdrop-blur-sm ${colors[sentiment] || colors.Mixed}`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-sm uppercase text-white">🤖 AI Audience Insight</h3>
        <span className="text-xs font-black uppercase px-2 py-1 bg-black/20 rounded text-white">
          {sentiment}
        </span>
      </div>
      <p className="italic text-sm text-slate-200">"{summary}"</p>
    </div>
  );
}