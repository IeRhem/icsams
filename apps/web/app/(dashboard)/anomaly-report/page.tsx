export default function AnomalyReportPage() {
  const reports = [
    {
      id: "RPT-ANOM-2026-041",
      title: "Perimeter Loitering & Fence Proximity Cluster",
      date: "Generated: Today, 14:00",
      severity: "HIGH",
      confidence: "97.2%",
      anomaliesCount: 8,
      status: "READY",
    },
    {
      id: "RPT-ANOM-2026-040",
      title: "Loading Dock Forklift Speed Anomaly",
      date: "Generated: Yesterday, 18:30",
      severity: "MEDIUM",
      confidence: "88.6%",
      anomaliesCount: 4,
      status: "READY",
    },
    {
      id: "RPT-ANOM-2026-039",
      title: "Unattended Cargo Obstruction Analysis",
      date: "Generated: Oct 13, 2026",
      severity: "HIGH",
      confidence: "93.1%",
      anomaliesCount: 6,
      status: "ARCHIVED",
    },
    {
      id: "RPT-ANOM-2026-038",
      title: "After-Hours Facial Recognition Mismatch Rate",
      date: "Generated: Oct 11, 2026",
      severity: "LOW",
      confidence: "84.0%",
      anomaliesCount: 2,
      status: "ARCHIVED",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Anomaly Detection Reports</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Machine learning behavioral models detecting statistical deviations from normal patterns.
          </p>
        </div>

        <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white shadow-sm transition-colors flex items-center gap-2">
          <span>⚡</span>
          <span>Generate New Report</span>
        </button>
      </div>

      {/* Model Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
          <div className="text-xs text-zinc-400">ML Model Status</div>
          <div className="text-lg font-bold text-emerald-400 mt-1">Active & Calibrated</div>
          <div className="text-xs text-zinc-400 mt-1">Model: isolation-forest-v3</div>
        </div>
        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
          <div className="text-xs text-zinc-400">Anomaly Baseline Drift</div>
          <div className="text-lg font-bold text-white mt-1">0.04 σ (Normal)</div>
          <div className="text-xs text-zinc-400 mt-1">Last retrained: 3 days ago</div>
        </div>
        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
          <div className="text-xs text-zinc-400">Flagged Incidents This Week</div>
          <div className="text-lg font-bold text-amber-400 mt-1">20 Incidents</div>
          <div className="text-xs text-zinc-400 mt-1">Across 12 camera streams</div>
        </div>
      </div>

      {/* Report List */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-white">Generated Anomaly Summaries</h2>

        <div className="space-y-3">
          {reports.map((rpt) => (
            <div
              key={rpt.id}
              className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-900 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs text-blue-400 font-semibold">{rpt.id}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                      rpt.severity === "HIGH"
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : rpt.severity === "MEDIUM"
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    }`}
                  >
                    {rpt.severity}
                  </span>
                </div>
                <div className="text-sm font-semibold text-white">{rpt.title}</div>
                <div className="text-xs text-zinc-400 flex items-center gap-4">
                  <span>{rpt.date}</span>
                  <span>•</span>
                  <span>Anomalies: {rpt.anomaliesCount}</span>
                  <span>•</span>
                  <span className="font-mono text-zinc-300">Confidence: {rpt.confidence}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <button className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 transition-colors">
                  View Analysis
                </button>
                <button className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 transition-colors">
                  PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
