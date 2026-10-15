export default function FootagePage() {
  const recordedSegments = [
    { time: "14:30 - 14:45", events: "1 Critical Alert", size: "1.4 GB", status: "FLAGGED" },
    { time: "14:15 - 14:30", events: "1 High Warning", size: "1.4 GB", status: "FLAGGED" },
    { time: "14:00 - 14:15", events: "Continuous Rec", size: "1.3 GB", status: "NORMAL" },
    { time: "13:45 - 14:00", events: "Continuous Rec", size: "1.3 GB", status: "NORMAL" },
    { time: "13:30 - 13:45", events: "1 Access Event", size: "1.4 GB", status: "NORMAL" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Footage Playback & Archive</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Browse, scrub, and export NVR continuous recordings and incident clips.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          <select className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-blue-500">
            <option>CAM-04 (North Perimeter Fence)</option>
            <option>CAM-01 (Main Entrance Gate)</option>
            <option>CAM-02 (Loading Dock B)</option>
            <option>CAM-07 (Server Room East)</option>
          </select>
          <input
            type="date"
            defaultValue="2026-10-15"
            className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Main Video Player */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
        <div className="aspect-video bg-zinc-950 relative flex flex-col justify-between p-4">
          <div className="flex items-center justify-between text-xs text-zinc-300 font-mono">
            <div className="flex items-center gap-2 bg-black/60 px-2.5 py-1 rounded">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>PLAYING: CAM-04 (NORTH PERIMETER)</span>
            </div>
            <div className="bg-black/60 px-2.5 py-1 rounded">2026-10-15 14:32:10 UTC</div>
          </div>

          <div className="text-center font-mono text-zinc-600 select-none text-sm">
            [ARCHIVED RECORDING STREAM]
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="font-mono bg-black/60 px-2 py-0.5 rounded">H.265 • 30 FPS • 4K</span>
            <span className="font-mono bg-black/60 px-2 py-0.5 rounded">Scrub Position: 00:32:10 / 01:00:00</span>
          </div>
        </div>

        {/* Player Controls & Scrubber */}
        <div className="p-4 bg-zinc-900 border-t border-zinc-800 space-y-3">
          {/* Timeline Bar with Event Markers */}
          <div className="space-y-1">
            <div className="relative h-6 bg-zinc-950 rounded border border-zinc-800 flex items-center px-1">
              {/* Event highlight segments */}
              <div
                className="absolute h-full bg-red-500/40 border-l-2 border-r-2 border-red-500 rounded"
                style={{ left: "53%", width: "4%" }}
                title="Critical Anomaly"
              />
              <div
                className="absolute h-full bg-amber-500/30 border-l border-r border-amber-500"
                style={{ left: "30%", width: "2%" }}
                title="Warning Event"
              />

              {/* Scrubber pointer */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-blue-500 shadow-md shadow-blue-500"
                style={{ left: "54%" }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-zinc-500">
              <span>14:00:00</span>
              <span>14:15:00</span>
              <span>14:30:00</span>
              <span>14:45:00</span>
              <span>15:00:00</span>
            </div>
          </div>

          {/* Buttons row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-xs text-white">
                ◀◀ 10s
              </button>
              <button className="px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white">
                Pause ❚❚
              </button>
              <button className="px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-xs text-white">
                10s ▶▶
              </button>
              <div className="flex items-center gap-1 pl-2">
                <button className="px-2 py-1 rounded bg-zinc-800 text-[11px] text-zinc-300">1x</button>
                <button className="px-2 py-1 rounded bg-zinc-800/40 text-[11px] text-zinc-500">2x</button>
                <button className="px-2 py-1 rounded bg-zinc-800/40 text-[11px] text-zinc-500">4x</button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 transition-colors">
                🔖 Bookmark Timestamp
              </button>
              <button className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white transition-colors">
                💾 Export MP4 Clip
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Segments List */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-white">Archived 15-Minute Video Segments</h2>
        <div className="divide-y divide-zinc-800/80">
          {recordedSegments.map((seg) => (
            <div key={seg.time} className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="font-mono text-zinc-200">{seg.time}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                    seg.status === "FLAGGED"
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : "bg-zinc-800 text-zinc-400"
                  }`}
                >
                  {seg.events}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-zinc-500 font-mono">{seg.size}</span>
                <button className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors">
                  Load in Player
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
