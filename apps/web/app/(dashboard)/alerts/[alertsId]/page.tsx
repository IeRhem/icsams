import Link from "next/link";
import { Suspense } from "react";

export const instant = false;

interface AlertDetailPageProps {
  params: Promise<{ alertsId: string }>;
}

async function AlertDetailContent({ params }: AlertDetailPageProps) {
  const { alertsId } = await params;

  return (
    <div className="space-y-6">
      {/* Breadcrumbs & Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
          <Link href="/alerts" className="hover:text-zinc-200 transition-colors">
            Alerts
          </Link>
          <span>/</span>
          <span className="text-zinc-200 uppercase font-mono">{alertsId}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-white uppercase font-mono">
              Incident {alertsId}
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/30">
              CRITICAL
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              OPEN
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 transition-colors">
              Dispatch Security
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-medium text-white transition-colors">
              Mark Resolved
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Frame Detection Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
            <div className="p-3 border-b border-zinc-800 bg-zinc-900 flex items-center justify-between text-xs text-zinc-400">
              <span className="font-mono text-zinc-200">Cam-04 • North Perimeter Feed</span>
              <span>Trigger Time: 14:32:10 UTC</span>
            </div>

            <div className="relative aspect-video bg-zinc-950 flex items-center justify-center">
              {/* Simulated Bounding Box for Detected Object */}
              <div className="absolute top-1/4 left-1/3 w-36 h-48 border-2 border-red-500 rounded bg-red-500/10 flex flex-col justify-between p-1.5 animate-pulse">
                <span className="bg-red-600 text-[10px] text-white px-1 py-0.5 rounded font-mono font-bold">
                  Person [98.4%]
                </span>
                <span className="text-[9px] text-red-300 font-mono">Loitering: 42s</span>
              </div>

              <div className="text-zinc-600 text-xs font-mono select-none">
                [INCIDENT KEYFRAME SNAPSHOT]
              </div>

              <div className="absolute bottom-3 left-3 text-[11px] font-mono bg-black/70 px-2 py-1 rounded text-zinc-300">
                Resolution: 1920x1080 • Sens: High
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 text-xs">
            <span className="text-zinc-400">Associated Footage Recording</span>
            <Link
              href="/footage"
              className="px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
            >
              Play Continuous Video Clip →
            </Link>
          </div>
        </div>

        {/* Telemetry and Details */}
        <div className="space-y-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-white">Incident Details</h2>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-zinc-800/80">
                <span className="text-zinc-400">Trigger Rule</span>
                <span className="text-white font-medium">Restricted Zone Loitering</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/80">
                <span className="text-zinc-400">Detection Confidence</span>
                <span className="text-emerald-400 font-mono font-semibold">98.4%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/80">
                <span className="text-zinc-400">Location</span>
                <span className="text-white">Zone 4 (North Perimeter)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/80">
                <span className="text-zinc-400">Camera Source</span>
                <span className="text-blue-400">CAM-04 (IP: 192.168.1.104)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800/80">
                <span className="text-zinc-400">AI Model Version</span>
                <span className="text-zinc-300 font-mono">yolov8-custom-v2.1</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-400">Assigned Operator</span>
                <span className="text-zinc-300">Admin Operator</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3">
            <h2 className="text-sm font-semibold text-white">Operator Notes</h2>
            <textarea
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-blue-500"
              rows={3}
              placeholder="Add incident investigation notes..."
            />
            <button className="w-full py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 font-medium transition-colors">
              Save Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AlertDetailPage(props: AlertDetailPageProps) {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-zinc-400 font-mono text-xs animate-pulse">
          Loading incident details...
        </div>
      }
    >
      <AlertDetailContent {...props} />
    </Suspense>
  );
}
