import { FaUserCheck, FaUserTimes, FaChartLine } from "react-icons/fa";

export default function AttendanceSummaryCard({
  present = 58,
  absent = 4,
  percentage = 93,
}) {
  const cards = [
    {
      title: "Present",
      value: present,
      color: "bg-green-100",
      icon: <FaUserCheck className="text-green-600 text-2xl" />,
    },
    {
      title: "Absent",
      value: absent,
      color: "bg-red-100",
      icon: <FaUserTimes className="text-red-600 text-2xl" />,
    },
    {
      title: "Attendance",
      value: `${percentage}%`,
      color: "bg-blue-100",
      icon: <FaChartLine className="text-blue-600 text-2xl" />,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white border rounded-2xl p-5 shadow-sm"
        >
          <div
            className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center mb-4`}
          >
            {card.icon}
          </div>

          <div className="text-gray-500">{card.title}</div>

          <div className="text-3xl font-bold mt-2">{card.value}</div>
        </div>
      ))}
    </div>
  );
}
