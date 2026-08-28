type ReportSummaryProps = {
  total: number;
  present: number;
  late: number;
  absent: number;
};

export default function ReportSummary({
  total,
  present,
  late,
  absent,
}: ReportSummaryProps) {
  const cards = [
    {
      title: "Total Records",
      value: total,
    },
    {
      title: "Present",
      value: present,
    },
    {
      title: "Late",
      value: late,
    },
    {
      title: "Absent",
      value: absent,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <p className="text-sm font-medium text-gray-500">
            {card.title}
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}