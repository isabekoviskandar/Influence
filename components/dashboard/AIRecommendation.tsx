export default function AIRecommendation({ text }: { text: string }) {
  return (
    <div className="bg-brand-primary/10 border border-brand-primary/30 p-6 rounded-card relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 transition-opacity group-hover:opacity-20 text-brand-primary">
        <span className="text-4xl font-black">AI</span>
      </div>
      <h3 className="text-brand-secondary font-bold text-sm uppercase tracking-wider mb-2">Smart Recommendation</h3>
      <p className="text-text-primary text-lg leading-relaxed">{text}</p>
      <button className="mt-4 text-sm font-semibold text-brand-primary hover:text-brand-secondary transition-colors">
        Try this idea →
      </button>
    </div>
  );
}
