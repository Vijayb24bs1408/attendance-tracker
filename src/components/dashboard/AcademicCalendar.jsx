import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function AcademicCalendar() {
  const [value, setValue] = useState(new Date());

  const festivals = [
    { date: "2026-01-26", name: "Republic Day" },
    { date: "2026-03-04", name: "Holi" },
    { date: "2026-08-15", name: "Independence Day" },
    { date: "2026-08-29", name: "Raksha Bandhan" },
    { date: "2026-10-20", name: "Diwali" },
    { date: "2026-12-25", name: "Christmas" },
  ];

  const currentMonth = value.getMonth() + 1;
  const currentYear = value.getFullYear();

  const monthFestivals = festivals.filter((festival) => {
    const d = new Date(festival.date);

    return d.getMonth() + 1 === currentMonth && d.getFullYear() === currentYear;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Academic Calendar</h2>

      <Calendar value={value} onChange={setValue} />

      <div className="mt-5 border-t pt-4">
        <h3 className="font-semibold mb-3">
          Festivals -{" "}
          {value.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>

        {monthFestivals.length === 0 ? (
          <p className="text-slate-500">No festivals this month.</p>
        ) : (
          <div className="space-y-2">
            {monthFestivals.map((festival) => (
              <div
                key={festival.date}
                className="flex justify-between rounded-lg bg-slate-50 p-3"
              >
                <span>{festival.name}</span>
                <span className="text-slate-500">{festival.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
