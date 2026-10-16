import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function DashboardPage() {
  const stats = [
    { label: "Active Cameras", value: "12 / 12", change: "+0 offline", status: "good" },
    { label: "Unresolved Alerts", value: "3", change: "2 critical", status: "alert" },
    { label: "Events Logged (24h)", value: "1,248", change: "+14% vs yesterday", status: "neutral" },
    { label: "AI Latency (Avg)", value: "42 ms", change: "Normal load", status: "good" },
  ];

  const recentAlerts = [
    {
      id: "alt-8092",
      camera: "Cam-04 • North Perimeter",
      rule: "Restricted Zone Loitering",
      severity: "CRITICAL",
      time: "2 mins ago",
      confidence: "98.4%",
    },
    {
      id: "alt-8091",
      camera: "Cam-02 • Loading Dock B",
      rule: "Object Left Unattended",
      severity: "HIGH",
      time: "14 mins ago",
      confidence: "91.2%",
    },
    {
      id: "alt-8089",
      camera: "Cam-07 • Server Room East",
      rule: "Unauthorized Access Attempt",
      severity: "HIGH",
      time: "48 mins ago",
      confidence: "94.7%",
    },
  ];

  const cameraStreams = [
    { id: "cam-01", name: "Main Entrance Gate", status: "ONLINE", location: "Perimeter", fps: 30 },
    { id: "cam-02", name: "Loading Dock B", status: "ALERT", location: "Logistics", fps: 30 },
    { id: "cam-03", name: "Warehouse Hall A", status: "ONLINE", location: "Storage", fps: 25 },
    { id: "cam-04", name: "North Perimeter", status: "ALERT", location: "Perimeter", fps: 30 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">System Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Real-time intelligent surveillance monitoring, telemetry, and threat detection.
        </p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (

          <div
            key={stat.label}
            className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 shadow-sm"
          >
            <div className="text-xs font-medium text-zinc-400">{stat.label}</div>
            <div className="text-2xl font-bold text-white mt-2">{stat.value}</div>
            <div className="text-xs mt-2 flex items-center gap-1.5">
              <span
                className={`inline-block w-1.5 h-1.5 rounded-full ${
                  stat.status === "alert"
                    ? "bg-red-400"
                    : stat.status === "good"
                    ? "bg-emerald-400"
                    : "bg-blue-400"
                }`}
              />
              <span className="text-zinc-400">{stat.change}</span>
            </div>
          </div>
        ))}

        <Card>
          <CardContent>
            
          </CardContent>
        </Card>

      </div>

      {/* Live Stream Previews */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Live Camera Highlights</h2>
          <Link
            href="/camaras"
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            View all 12 streams →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cameraStreams.map((cam) => (
            <div
              key={cam.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden flex flex-col group"
            >
              <div className="h-40 bg-zinc-950 flex flex-col justify-between p-3 relative">
                <div className="flex items-center justify-between z-10">
                  <span className="text-[10px] font-mono bg-black/60 px-2 py-0.5 rounded text-zinc-300">
                    {cam.id.toUpperCase()}
                  </span>
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      cam.status === "ALERT"
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        cam.status === "ALERT" ? "bg-red-400 animate-ping" : "bg-emerald-400"
                      }`}
                    />
                    {cam.status}
                  </span>
                </div>

                <div className="text-center text-xs text-zinc-600 font-mono select-none">
                  [LIVE STREAM FEED]
                </div>

                <div className="flex items-center justify-between text-[11px] text-zinc-400 z-10 font-mono">
                  <span>{cam.location}</span>
                  <span>{cam.fps} FPS</span>
                </div>
              </div>
              <div className="p-3 bg-zinc-900 flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-200">{cam.name}</span>
                <Link
                  href="/footage"
                  className="text-[11px] text-zinc-400 hover:text-white transition-colors"
                >
                  History
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Alerts Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Recent Urgent Alerts</h2>
          <Link
            href="/alerts"
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            All alerts →
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50">
          <div className="divide-y divide-zinc-800/80">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className="p-4 flex items-center justify-between hover:bg-zinc-800/40 transition-colors gap-4"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${
                      alert.severity === "CRITICAL"
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                    }`}
                  >
                    {alert.severity}
                  </span>
                  <div>
                    <Link
                      href={`/alerts/${alert.id}`}
                      className="text-sm font-semibold text-zinc-100 hover:underline"
                    >
                      {alert.rule}
                    </Link>
                    <div className="text-xs text-zinc-400 mt-0.5">{alert.camera}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-xs text-zinc-300 font-mono">
                      Conf: {alert.confidence}
                    </div>
                    <div className="text-[11px] text-zinc-500">{alert.time}</div>
                  </div>
                  <Link
                    href={`/alerts/${alert.id}`}
                    className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
                  >
                    Investigate
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
