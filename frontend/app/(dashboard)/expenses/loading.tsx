export default function ExpensesLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="h-8 w-32 bg-surface rounded-lg mb-2" />
          <div className="h-4 w-64 bg-surface rounded-lg" />
        </div>
        <div className="h-10 w-36 bg-surface rounded-lg" />
      </div>

      {/* Filters Skeleton */}
      <div className="h-auto bg-surface rounded-xl border border-border p-4">
        <div className="flex flex-col sm:flex-row gap-4">
           <div className="h-10 w-full sm:w-1/3 bg-background rounded-lg border border-border" />
           <div className="h-10 w-full sm:w-1/3 bg-background rounded-lg border border-border" />
           <div className="h-10 w-full sm:w-1/3 bg-background rounded-lg border border-border" />
        </div>
      </div>

      {/* Stats Bar Skeleton */}
      <div className="flex justify-end">
         <div className="h-20 w-full sm:w-auto min-w-75 bg-surface rounded-xl border border-border" />
      </div>

      {/* Table Skeleton: Cuerpo de la tabla */}
      <div className="h-96 bg-surface rounded-xl border border-border" />
    </div>
  );
}