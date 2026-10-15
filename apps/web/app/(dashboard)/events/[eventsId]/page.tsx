import Link from "next/link";
import { Suspense } from "react";

export const instant = false;

interface EventDetailPageProps {
  params: Promise<{ eventsId: string }>;
}

async function EventDetailContent({ params }: EventDetailPageProps) {
  const { eventsId } = await params;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
          <Link href="/events" className="hover:text-zinc-200 transition-colors">
            Events
          </Link>
          <span>/</span>
          <span className="text-zinc-200 uppercase font-mono">{eventsId}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-white uppercase font-mono">
              Event {eventsId}
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Zone Intrusion
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/footage"
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 transition-colors"
            >
              Watch Video
            </Link>
            <button className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white transition-colors">
              Export Telemetry
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
            <div className="p-3 border-b border-zinc-800 bg-zinc-900 flex items-center justify-between text-xs text-zinc-400">
              <span>Detection Playback Feed</span>
              <span className="font-mono text-zinc-300">Timestamp: 14:32:08.412 UTC</span>
            </div>
            <div className="aspect-video bg-zinc-950 flex flex-col items-center justify-center relative">
              <div className="text-zinc-600 text-xs font-mono">[EVENT RECORDING PLAYBACK]</div>
              <div className="absolute bottom-3 left-3 flex gap-2 font-mono text-[10px] bg-black/70 px-2 py-1 rounded text-zinc-300">
                <span>FPS: 30</span>
                <span>•</span>
                <span>TrackID: #4012</span>
                <span>•</span>
                <span>Confidence: 96.8%</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3">
            <h2 className="text-sm font-semibold text-white">Detected Object Bounding Boxes</h2>
            <div className="space-y-2 text-xs font-mono text-zinc-300">
              <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 flex justify-between items-center">
                <span>Class: Person (ID: #4012)</span>
                <span className="text-zinc-400">Box: [x: 412, y: 180, w: 94, h: 220]</span>
                <span className="text-emerald-400">96.8%</span>
              </div>
              <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 flex justify-between items-center">
                <span>Class: Backpack</span>
                <span className="text-zinc-400">Box: [x: 430, y: 280, w: 40, h: 55]</span>
                <span className="text-emerald-400">89.1%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3">
            <h2 className="text-sm font-semibold text-white">Metadata & Sensor Specs</h2>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-zinc-800">
                <span className="text-zinc-400">Camera Source</span>
                <span className="text-zinc-200">Cam-04 North</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800">
                <span className="text-zinc-400">Duration</span>
                <span className="text-zinc-200">48 seconds</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800">
                <span className="text-zinc-400">Frame Index</span>
                <span className="text-zinc-200 font-mono">14,290</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800">
                <span className="text-zinc-400">Pipeline Model</span>
                <span className="text-zinc-200 font-mono">yolov8-detect</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-400">Inference Device</span>
                <span className="text-zinc-200 font-mono">CUDA / RTX 4090</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EventDetailPage(props: EventDetailPageProps) {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-zinc-400 font-mono text-xs animate-pulse">
          Loading event telemetry...
        </div>
      }
    >
      <EventDetailContent {...props} />
    </Suspense>
  );
}
