export default function TopPostsCard({ posts }: { posts: { title: string; date: string; engagement: number }[] }) {
  return (
    <div className="bg-surface border border-border p-6 rounded-card">
      <h3 className="text-lg font-bold mb-4">Top Performing Posts</h3>
      <div className="space-y-4">
        {posts.map((post, idx) => (
          <div key={idx} className="flex items-center gap-4 p-2 rounded-lg hover:bg-white/5">
            <div className="w-12 h-12 bg-brand-secondary/20 rounded-md" />
            <div className="flex-1">
              <p className="text-sm font-medium truncate">{post.title}</p>
              <p className="text-xs text-text-secondary">{post.date}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-success">{post.engagement}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
