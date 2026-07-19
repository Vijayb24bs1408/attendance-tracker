export function downloadClassTemplate() {
  const csv = [
    [
      "Day",
      "Subject",
      "Class",
      "Room",
      "Start Time",
      "End Time",
    ],
    [
      "Monday",
      "Applied AI",
      "BSc AI-A",
      "A101",
      "09:00",
      "10:00",
    ],
    [
      "Tuesday",
      "Machine Learning",
      "BSc AI-B",
      "A102",
      "11:00",
      "12:00",
    ],
    [
      "Wednesday",
      "Data Science",
      "BSc AI-C",
      "B201",
      "10:00",
      "11:00",
    ],
  ];

  const csvContent = csv.map((row) => row.join(",")).join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "AttendanceTracker_Template.csv";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}