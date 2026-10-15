export default function AnalyticsPage() {
  const timeMetrics = [
    { hour: "00:00", value: 12 },
    { hour: "02:00", value: 8 },
    { hour: "04:00", value: 6 },
    { hour: "06:00", value: 24 },
    { hour: "08:00", value: 92 },
    { hour: "10:00", value: 140 },
    { hour: "12:00", value: 165 },
    { hour: "14:00", value: 180 },
    { hour: "16:00", value: 145 },
    { hour: "18:00", value: 88 },
    { hour: "20:00", value: 45 },
    { hour: "22:00", value: 22 },
  ];

  const categories = [
    { name: "Unauthorized Loitering", count: 42, percentage: 38, color: "bg-red-500" },
    { name: "Abandoned Packages / Items", count: 28, percentage: 25, color: "bg-amber-500" },
    { name: "Perimeter Motion Trips", count: 24, percentage: 22, color: "bg-blue-500" },
    { name: "Door Access Anomalies", count: 16, percentage: 15, color: "bg-purple-500" },
  ];

  const zoneRisk = [
    { zone: "North Perimeter (Zone 4)", incidents: 38, risk: "CRITICAL", trend: "+12%" },
    { zone: "Loading Dock B (Zone 2)", incidents: 29, risk: "HIGH", trend: "-5%" },
    { zone: "Server Room East (Zone 7)", incidents: 14, risk: "HIGH", trend: "+2%" },
    { zone: "South Fence Gate (Zone 9)", incidents: 11, risk: "MEDIUM", trend: "-18%" },
    { zone: "Main Entrance (Zone 1)", incidents: 6, risk: "LOW", trend: "0%" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Security & Threat Analytics</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Aggregated computer vision telemetry, recurring pattern anomalies, and risk indices.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-lg p-1 text-xs">
          <button className="px-3 py-1 rounded bg-zinc-800 text-white font-medium">24 Hours</button>
          <button className="px-3 py-1 rounded text-zinc-400 hover:text-white transition-colors">7 Days</button>
          <button className="px-3 py-1 rounded text-zinc-400 hover:text-white transition-colors">30 Days</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
          <div className="text-xs text-zinc-400">Total Detections</div>
          <div className="text-2xl font-bold text-white mt-2">1,248</div>
          <div className="text-xs text-emerald-400 mt-1">↑ +8.4% vs last cycle</div>
        </div>
        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
          <div className="text-xs text-zinc-400">False Positive Rate</div>
          <div className="text-2xl font-bold text-white mt-2">1.2%</div>
          <div className="text-xs text-emerald-400 mt-1">↓ -0.4% improvement</div>
        </div>
        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
          <div className="text-xs text-zinc-400">Avg Response Time</div>
          <div className="text-2xl font-bold text-white mt-2">1m 45s</div>
          <div className="text-xs text-zinc-400 mt-1">Security dispatch SLA</div>
        </div>
        <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
          <div className="text-xs text-zinc-400">High Risk Incidents</div>
          <div className="text-2xl font-bold text-red-400 mt-2">18</div>
          <div className="text-xs text-amber-400 mt-1">3 pending review</div>
        </div>
      </div>

      {/* Activity Timeline Bar Chart */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-white">Hourly Detection Distribution</h2>
            <p className="text-xs text-zinc-400 mt-0.5">Frequency of detected movement and trigger events</p>
          </div>
          <div className="text-xs font-mono text-zinc-400">Peak: 14:00 (180 events)</div>
        </div>

        <div className="h-44 flex items-end gap-3 pt-6 border-b border-zinc-800">
          {timeMetrics.map((item) => (
            <div key={item.hour} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
              <div className="text-[10px] text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                {item.value}
              </div>
              <div
                className="w-full bg-blue-600/70 hover:bg-blue-500 rounded-t transition-all"
                style={{ height: `${(item.value / 180) * 100}%` }}
              />
              <span className="text-[10px] text-zinc-400 font-mono mt-1">{item.hour}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category Breakdown & Zone Risk Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white">Detection Type Breakdown</h2>
          <div className="space-y-4">
            {categories.map((cat) => (
              <div key={cat.name} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-300">{cat.name}</span>
                  <span className="text-zinc-400 font-mono">{cat.count} ({cat.percentage}%)</span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`${cat.color} h-full rounded-full`}
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white">Zone Threat Exposure</h2>
          <div className="divide-y divide-zinc-800/80">
            {zoneRisk.map((z) => (
              <div key={z.zone} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <div className="text-white font-medium">{z.zone}</div>
                  <div className="text-zinc-400 mt-0.5">{z.incidents} incidents recorded</div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      z.risk === "CRITICAL"
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : z.risk === "HIGH"
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    }`}
                  >
                    {z.risk}
                  </span>
                  <span className="text-zinc-400 font-mono text-[11px]">{z.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
