import Link from "next/link";

export default function AlertsPage() {
  const alerts = [
    {
      id: "ALT-8092",
      severity: "CRITICAL",
      title: "Restricted Zone Loitering",
      camera: "Cam-04 (North Perimeter)",
      timestamp: "Today, 14:32:10",
      status: "OPEN",
      confidence: "98.4%",
    },
    {
      id: "ALT-8091",
      severity: "HIGH",
      title: "Object Left Unattended > 10m",
      camera: "Cam-02 (Loading Dock B)",
      timestamp: "Today, 14:18:45",
      status: "INVESTIGATING",
      confidence: "91.2%",
    },
    {
      id: "ALT-8089",
      severity: "HIGH",
      title: "Unauthorized After-Hours Movement",
      camera: "Cam-07 (Server Room East)",
      timestamp: "Today, 13:44:02",
      status: "OPEN",
      confidence: "94.7%",
    },
    {
      id: "ALT-8085",
      severity: "MEDIUM",
      title: "Perimeter Motion Spike",
      camera: "Cam-09 (South Fence Gate)",
      timestamp: "Today, 11:20:15",
      status: "RESOLVED",
      confidence: "82.5%",
    },
    {
      id: "ALT-8078",
      severity: "LOW",
      title: "Camera Field Obstruction Warning",
      camera: "Cam-01 (Main Entrance Gate)",
      timestamp: "Today, 09:12:44",
      status: "RESOLVED",
      confidence: "78.0%",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Alerts & Incidents</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Real-time notifications triggered by vision AI threat detection rules.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 transition-colors">
            Acknowledge All
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white transition-colors">
            Configure Rules
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 text-xs">
        <button className="px-3 py-1.5 rounded-md bg-zinc-800 text-white font-medium">
          All Alerts (5)
        </button>
        <button className="px-3 py-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors">
          Critical (1)
        </button>
        <button className="px-3 py-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors">
          High (2)
        </button>
        <button className="px-3 py-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors">
          Resolved (2)
        </button>
      </div>

      {/* Alerts Table */}
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-900 border-b border-zinc-800 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            <tr>
              <th className="px-5 py-3">Alert ID</th>
              <th className="px-5 py-3">Severity</th>
              <th className="px-5 py-3">Trigger / Description</th>
              <th className="px-5 py-3">Camera Source</th>
              <th className="px-5 py-3">Confidence</th>
              <th className="px-5 py-3">Timestamp</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/70 text-zinc-300">
            {alerts.map((item) => (
              <tr key={item.id} className="hover:bg-zinc-800/40 transition-colors">
                <td className="px-5 py-4 font-mono text-xs font-medium text-blue-400">
                  <Link href={`/alerts/${item.id.toLowerCase()}`} className="hover:underline">
                    {item.id}
                  </Link>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded font-mono font-bold ${
                      item.severity === "CRITICAL"
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : item.severity === "HIGH"
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        : item.severity === "MEDIUM"
                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                        : "bg-zinc-700/50 text-zinc-300 border border-zinc-600/30"
                    }`}
                  >
                    {item.severity}
                  </span>
                </td>
                <td className="px-5 py-4 font-medium text-white">{item.title}</td>
                <td className="px-5 py-4 text-xs text-zinc-400">{item.camera}</td>
                <td className="px-5 py-4 text-xs font-mono text-zinc-300">{item.confidence}</td>
                <td className="px-5 py-4 text-xs text-zinc-400">{item.timestamp}</td>
                <td className="px-5 py-4">
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                      item.status === "OPEN"
                        ? "bg-red-500/10 text-red-400 border border-red-500/20"
                        : item.status === "INVESTIGATING"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <Link
                    href={`/alerts/${item.id.toLowerCase()}`}
                    className="text-xs px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
