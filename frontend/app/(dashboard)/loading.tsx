export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div>
        <div className="h-8 w-48 bg-surface rounded-lg mb-2" />
        <div className="h-4 w-64 bg-surface rounded-lg" />
      </div>

      {/* Summary Cards Skeleton */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {new Array(3).map((_, i) => (
          <div
            key={i + "-skeleton"}
            className="h-32 bg-surface rounded-xl border border-border"
          />
        ))}
      </div>

      <div className="space-y-4">
        {/* Recent Expenses Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-7 w-40 bg-surface rounded-lg" />
          <div className="h-10 w-32 bg-surface rounded-lg" />
        </div>

        {/* Recent Expenses Table Skeleton */}
        <div className="h-96 bg-surface rounded-xl border border-border" />
      </div>
    </div>
  );
}
