import Link from "next/link";
import React from "react";

const navigationItems = [
  { name: "Overview", href: "/dashboard", icon: "📊" },
  { name: "Live Cameras", href: "/camaras", icon: "📹" },
  { name: "Alerts", href: "/alerts", icon: "🚨", badge: "3" },
  { name: "Events", href: "/events", icon: "⚡" },
  { name: "Footage Playback", href: "/footage", icon: "🎞️" },
  { name: "Analytics", href: "/analytics", icon: "📈" },
  { name: "Anomaly Reports", href: "/anomaly-report", icon: "⚠️" },
  { name: "Thresholds", href: "/thresholds", icon: "⚙️" },
  { name: "Reports", href: "/reports", icon: "📑" },
  { name: "Settings", href: "/settings", icon: "🔧" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-900/80 backdrop-blur-md flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-zinc-800 gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
            IC
          </div>
          <div>
            <div className="font-semibold text-sm tracking-wide text-white">ICSAMS</div>
            <div className="text-[11px] text-zinc-400">Surveillance & AI Monitoring</div>
          </div>
        </div>

        <div className="p-3">
          <div className="px-3 py-2 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
            Control Center
          </div>
          <nav className="flex flex-col gap-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-xs px-1.5 py-0.5 rounded-full font-medium">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs text-zinc-400">Engine Online</span>
            </div>
            <Link
              href="/auth/login"
              className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              Sign out
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 border-b border-zinc-800 bg-zinc-900/40 backdrop-blur-md px-8 flex items-center justify-between shrink-0">
          <div className="text-sm text-zinc-400">
            System Status: <span className="text-emerald-400 font-medium">Operational</span> (12 Streams Active)
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/alerts"
              className="relative p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 transition-colors"
            >
              <span>🔔</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
            </Link>
            <div className="flex items-center gap-2.5 pl-3 border-l border-zinc-800">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white">
                AD
              </div>
              <span className="text-xs font-medium text-zinc-200">Admin Operator</span>
            </div>
          </div>
        </header>

        <div className="p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
