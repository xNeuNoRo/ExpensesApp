export default function ReportsLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="h-8 w-48 bg-surface rounded-lg mb-2" />
          <div className="h-4 w-64 bg-surface rounded-lg" />
        </div>
        <div className="h-10 w-32 bg-surface rounded-lg" />
      </div>

      {/* Filters Skeleton */}
      <div className="h-16 w-full bg-surface rounded-xl border border-border" />

      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {new Array(4).map((_, i) => (
          <div
            key={i+"-skeleton"}
            className="h-32 bg-surface rounded-xl border border-border"
          />
        ))}
      </div>

      {/* List Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-64 bg-surface rounded-xl border border-border" />
        <div className="h-64 bg-surface rounded-xl border border-border" />
      </div>
    </div>
  );
}
