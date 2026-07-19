export default function AlertPreviewModal({ open, alert, onClose }) {
  if (!open || !alert) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-2xl font-bold">🤖 AI Parent Alert</h2>

          <button
            onClick={onClose}
            className="text-2xl text-slate-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Info label="Student" value={alert.studentName || "N/A"} />

            <Info label="Parent" value={alert.parentName || "N/A"} />

            <Info
              label="Attendance"
              value={`${alert.attendancePercentage ?? 0}%`}
            />

            <Info label="Risk Score" value={`${alert.riskScore ?? 0}/100`} />

            <Info label="Risk Level" value={alert.riskLevel || "N/A"} />

            <Info label="Priority" value={alert.priority || "N/A"} />
          </div>

          <div className="mt-6">
            <h3 className="mb-2 font-semibold">💡 AI Recommendation</h3>

            <div className="rounded-xl bg-blue-50 p-4">
              {alert.recommendation || "No recommendation available."}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-2 font-semibold">📩 Parent Message</h3>

            <div className="rounded-xl bg-slate-100 p-4 whitespace-pre-wrap">
              {alert.message || "No message available."}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t p-6">
          <button
            onClick={onClose}
            className="rounded-xl border px-5 py-2 hover:bg-slate-100"
          >
            Close
          </button>

          <button className="rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
            Send SMS
          </button>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-sm text-slate-500">{label}</p>

      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}
