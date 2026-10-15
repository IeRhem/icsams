export default function ReportsPage() {
  const reports = [
    {
      id: "RPT-2026-W41",
      title: "Weekly Security & Incident Audit Digest",
      period: "Oct 08, 2026 - Oct 15, 2026",
      generatedBy: "System Automated Cron",
      format: "PDF (3.2 MB)",
      incidents: 42,
    },
    {
      id: "RPT-2026-M09",
      title: "Monthly Perimeter Breach & Loitering Audit",
      period: "Sep 01, 2026 - Sep 30, 2026",
      generatedBy: "Admin Operator",
      format: "PDF (8.1 MB)",
      incidents: 128,
    },
    {
      id: "RPT-2026-SLA",
      title: "CCTV Hardware Uptime & Telemetry Reliability",
      period: "Q3 2026 (Jul - Sep)",
      generatedBy: "DevOps Monitoring",
      format: "CSV (450 KB)",
      incidents: 3,
    },
    {
      id: "RPT-2026-COMP",
      title: "Facility Access Compliance & Audit Trail",
      period: "Oct 01, 2026 - Oct 14, 2026",
      generatedBy: "System Automated Cron",
      format: "PDF (2.8 MB)",
      incidents: 19,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Compliance & Audit Reports</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Export executive security summaries, incident audit logs, and hardware reliability metrics.
          </p>
        </div>

        <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white shadow-sm transition-colors flex items-center gap-2">
          <span>+</span>
          <span>Generate New Report</span>
        </button>
      </div>

      {/* Reports Table */}
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-900 border-b border-zinc-800 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            <tr>
              <th className="px-5 py-3">Report ID</th>
              <th className="px-5 py-3">Document Title</th>
              <th className="px-5 py-3">Coverage Period</th>
              <th className="px-5 py-3">Author</th>
              <th className="px-5 py-3">Format</th>
              <th className="px-5 py-3 text-right">Download</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/70 text-zinc-300">
            {reports.map((r) => (
              <tr key={r.id} className="hover:bg-zinc-800/40 transition-colors">
                <td className="px-5 py-4 font-mono text-xs font-medium text-blue-400">{r.id}</td>
                <td className="px-5 py-4 font-medium text-white">{r.title}</td>
                <td className="px-5 py-4 text-xs text-zinc-400">{r.period}</td>
                <td className="px-5 py-4 text-xs text-zinc-300">{r.generatedBy}</td>
                <td className="px-5 py-4 text-xs font-mono text-zinc-400">{r.format}</td>
                <td className="px-5 py-4 text-right">
                  <button className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors">
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Report Schedules Section */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-white">Automated Delivery Schedules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800/80 flex justify-between items-center text-xs">
            <div>
              <div className="font-medium text-white">Weekly Executive Summary</div>
              <div className="text-zinc-500 mt-0.5">Every Monday at 06:00 UTC • Sent to security@icsams.local</div>
            </div>
            <span className="text-emerald-400 font-mono text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded">
              Active
            </span>
          </div>

          <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800/80 flex justify-between items-center text-xs">
            <div>
              <div className="font-medium text-white">Monthly Compliance Digest</div>
              <div className="text-zinc-500 mt-0.5">1st of every month at 00:00 UTC • Sent to compliance@icsams.local</div>
            </div>
            <span className="text-emerald-400 font-mono text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
