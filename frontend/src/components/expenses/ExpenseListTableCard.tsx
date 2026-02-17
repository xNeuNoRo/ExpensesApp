type ExpenseListTableCardsProps = {
  title: string;
  value: string;
};

export default function ExpenseListTableCard({
  title,
  value,
}: Readonly<ExpenseListTableCardsProps>) {
  return (
    <div className="flex justify-end animate-in fade-in slide-in-from-bottom-2">
      <div className="inline-flex items-center gap-3 rounded-xl border border-border bg-surface px-5 py-3 shadow-sm">
        <div className="flex flex-col items-end">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            {title}
          </span>
          <span className="text-xl font-bold text-main tabular-nums">
            {value}
          </span>
        </div>
      </div>
    </div>
  );
}
