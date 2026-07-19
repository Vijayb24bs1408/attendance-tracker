import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getTodayAlerts } from "../services/alertService";
import AlertPreviewModal from "../components/alerts/AlertPreviewModal";
import { sendParentEmail } from "../services/emailService";

export default function SmartParentAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendingId, setSendingId] = useState(null);

  const [successCount, setSuccessCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    loadAlerts();
  }, []);

  async function loadAlerts() {
    try {
      const data = await getTodayAlerts();
      setAlerts(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }
  async function handleSendEmail(alertData) {
    try {
      setSendingId(alertData.id);

      await sendParentEmail(alertData);

      alert("✅ Email Sent Successfully");
    } catch (error) {
      alert(error.message);
    } finally {
      setSendingId(null);
    }
  }
  async function handleSendAll() {
    if (alerts.length === 0) {
      alert("No alerts available");
      return;
    }

    setSending(true);

    let success = 0;
    let failed = 0;

    for (let i = 0; i < alerts.length; i++) {
      try {
        await sendParentEmail(alerts[i]);
        success++;
      } catch (error) {
        console.error(error);
        failed++;
      }

      setProgress(i + 1);
    }

    setSuccessCount(success);
    setFailedCount(failed);

    setSending(false);

    alert(`Finished\n\n✅ Sent : ${success}\n❌ Failed : ${failed}`);
  }

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) =>
      alert.studentName?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [alerts, search]);

  const high = alerts.filter((a) => a.priority === "High").length;
  const medium = alerts.filter((a) => a.priority === "Medium").length;
  const low = alerts.filter((a) => a.priority === "Low").length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">🤖 Smart Parent Alerts</h1>

            <p className="text-slate-500">AI Generated Parent Notifications</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={loadAlerts}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl"
            >
              Refresh
            </button>

            <button
              onClick={handleSendAll}
              disabled={sending}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-5 py-2 rounded-xl"
            >
              {sending ? "Sending..." : "📧 Send All"}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-5">
          <StatCard title="High Priority" value={high} color="bg-red-500" />

          <StatCard
            title="Medium Priority"
            value={medium}
            color="bg-yellow-500"
          />

          <StatCard title="Low Priority" value={low} color="bg-green-500" />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <StatCard
            title="Emails Sent"
            value={successCount}
            color="bg-green-600"
          />

          <StatCard title="Failed" value={failedCount} color="bg-red-600" />
        </div>

        {sending && (
          <div className="bg-white shadow rounded-2xl p-5">
            <div className="flex justify-between mb-3">
              <span className="font-semibold">Sending Emails...</span>

              <span>
                {progress} / {alerts.length}
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-600 h-4 rounded-full transition-all"
                style={{
                  width: `${(progress / alerts.length) * 100}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Search */}
        <input
          type="text"
          placeholder="Search Student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-xl p-3"
        />

        {/* Table */}
        <div className="bg-white rounded-2xl shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left">Student</th>
                <th className="p-3 text-left">Parent</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Attendance</th>
                <th className="p-3 text-center">Risk</th>
                <th className="p-3 text-center">Score</th>
                <th className="p-3 text-left">Recommendation</th>
                <th className="p-3 text-center">Preview</th>
                <th className="p-3 text-center">Email</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="text-center p-10">
                    Loading...
                  </td>
                </tr>
              ) : filteredAlerts.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center p-10">
                    No Alerts Found
                  </td>
                </tr>
              ) : (
                filteredAlerts.map((alert) => (
                  <tr key={alert.id} className="border-b hover:bg-slate-50">
                    <td className="p-3 font-semibold">{alert.studentName}</td>

                    <td className="p-3">{alert.parentName}</td>

                    <td className="text-center">{alert.attendanceStatus}</td>

                    <td className="text-center font-semibold">
                      {alert.attendancePercentage}%
                    </td>

                    <td className="text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${
                          alert.riskLevel === "Critical"
                            ? "bg-red-700"
                            : alert.riskLevel === "High"
                              ? "bg-orange-500"
                              : alert.riskLevel === "Medium"
                                ? "bg-yellow-500"
                                : alert.riskLevel === "Low"
                                  ? "bg-green-600"
                                  : "bg-blue-600"
                        }`}
                      >
                        {alert.riskLevel}
                      </span>
                    </td>

                    <td className="text-center font-bold">
                      {alert.riskScore}/100
                    </td>

                    <td className="p-3 text-sm">{alert.recommendation}</td>

                    <>
                      <td className="text-center">
                        <button
                          onClick={() => {
                            setSelectedAlert(alert);
                            setOpenModal(true);
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
                        >
                          Preview
                        </button>
                      </td>

                      <td className="text-center">
                        <button
                          disabled={sendingId === alert.id}
                          onClick={() => handleSendEmail(alert)}
                          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-3 py-1 rounded-lg"
                        >
                          {sendingId === alert.id ? "Sending..." : "📧 Send"}
                        </button>
                      </td>
                    </>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <AlertPreviewModal
        open={openModal}
        alert={selectedAlert}
        onClose={() => setOpenModal(false)}
      />
    </DashboardLayout>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className={`w-4 h-4 rounded-full ${color}`} />

      <h2 className="text-slate-500 mt-3">{title}</h2>

      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
