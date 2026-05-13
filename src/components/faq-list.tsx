import type { FaqItem } from "@/types/content";

type FaqListProps = {
  items: FaqItem[];
};

export function FaqList({ items }: FaqListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <details key={item.question} className="rounded-lg border border-slate-200 bg-white p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-900">{item.question}</summary>
          <p className="mt-2 text-sm leading-6 text-slate-600">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
