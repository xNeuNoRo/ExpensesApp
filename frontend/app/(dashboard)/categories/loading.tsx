export default function CategoriesLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="h-8 w-40 bg-surface rounded-lg mb-2" />
          <div className="h-4 w-64 bg-surface rounded-lg" />
        </div>
        <div className="h-10 w-40 bg-surface rounded-lg" />
      </div>

      {/* Table Skeleton */}
      <div className="rounded-xl border border-border bg-background shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="h-12 bg-surface border-b border-border" />
        
        {/* Table Rows */}
        <div className="divide-y divide-border">
          {new Array(8).map((_, i) => (
            <div key={i + "-skeletonF"} className="flex items-center p-4">
              <div className="flex items-center gap-3 w-1/2">
                <div className="h-9 w-9 rounded-lg bg-surface shrink-0" />
                <div className="h-4 w-32 bg-surface rounded" />
              </div>
              <div className="w-1/4 pl-4">
                <div className="h-4 w-20 bg-surface rounded" />
              </div>
              <div className="w-24 flex justify-center">
                <div className="h-6 w-6 rounded-full bg-surface" />
              </div>
              <div className="w-32 flex justify-center gap-2">
                <div className="h-9 w-9 rounded-lg bg-surface" />
                <div className="h-9 w-9 rounded-lg bg-surface" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}