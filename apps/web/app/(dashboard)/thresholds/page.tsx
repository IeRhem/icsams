export default function ThresholdsPage() {
  const zoneOverrides = [
    { zone: "Zone 1 - Main Entrance", sensitivity: "Medium (75%)", minConfidence: "80%", loiteringTime: "45s" },
    { zone: "Zone 4 - North Perimeter", sensitivity: "High (95%)", minConfidence: "70%", loiteringTime: "15s" },
    { zone: "Zone 7 - Server Room East", sensitivity: "Maximum (99%)", minConfidence: "65%", loiteringTime: "5s" },
    { zone: "Zone 2 - Loading Dock B", sensitivity: "Low (50%)", minConfidence: "85%", loiteringTime: "120s" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Detection Thresholds & Sensitivity</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Configure machine vision trigger rules, loitering limits, and confidence cutoff percentages.
          </p>
        </div>

        <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white shadow-sm transition-colors">
          Save Configuration
        </button>
      </div>

      {/* Global Detection Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-4">
          <h2 className="text-sm font-semibold text-white">Global Vision Sensitivity</h2>

          <div className="space-y-4 text-xs">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-300">Minimum Classification Confidence</span>
                <span className="font-mono text-blue-400 font-semibold">85%</span>
              </div>
              <input
                type="range"
                min="50"
                max="99"
                defaultValue="85"
                className="w-full accent-blue-500"
              />
              <span className="text-[11px] text-zinc-500">
                Detections below this probability threshold are discarded as noise.
              </span>
            </div>

            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <div className="flex justify-between">
                <span className="text-zinc-300">Loitering Time Trigger</span>
                <span className="font-mono text-blue-400 font-semibold">30 seconds</span>
              </div>
              <input
                type="range"
                min="5"
                max="120"
                defaultValue="30"
                className="w-full accent-blue-500"
              />
              <span className="text-[11px] text-zinc-500">
                Duration a tracked person remains stationary before triggering an alert.
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-4">
          <h2 className="text-sm font-semibold text-white">Static Object & Motion Calibration</h2>

          <div className="space-y-4 text-xs">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-300">Abandoned Object Timeout</span>
                <span className="font-mono text-blue-400 font-semibold">5 minutes</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                defaultValue="5"
                className="w-full accent-blue-500"
              />
              <span className="text-[11px] text-zinc-500">
                Time an unattended item must remain motionless before raising an alarm.
              </span>
            </div>

            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <div className="flex justify-between">
                <span className="text-zinc-300">Night Mode Multiplier</span>
                <span className="font-mono text-blue-400 font-semibold">1.4x Sens</span>
              </div>
              <input
                type="range"
                min="1"
                max="2"
                step="0.1"
                defaultValue="1.4"
                className="w-full accent-blue-500"
              />
              <span className="text-[11px] text-zinc-500">
                Boosts infrared and low-light optical sensitivity between 20:00 - 06:00.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Per Zone Overrides Table */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Per-Zone Sensitivity Overrides</h2>
          <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
            + Add Zone Rule
          </button>
        </div>

        <div className="overflow-hidden rounded-lg border border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-900 text-zinc-400 border-b border-zinc-800 font-semibold">
              <tr>
                <th className="px-4 py-2.5">Security Zone</th>
                <th className="px-4 py-2.5">Preset Sensitivity</th>
                <th className="px-4 py-2.5">Min Confidence</th>
                <th className="px-4 py-2.5">Loitering Threshold</th>
                <th className="px-4 py-2.5 text-right">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80 text-zinc-300">
              {zoneOverrides.map((zo) => (
                <tr key={zo.zone} className="hover:bg-zinc-800/40">
                  <td className="px-4 py-3 font-medium text-white">{zo.zone}</td>
                  <td className="px-4 py-3 font-mono">{zo.sensitivity}</td>
                  <td className="px-4 py-3 font-mono text-emerald-400">{zo.minConfidence}</td>
                  <td className="px-4 py-3 font-mono">{zo.loiteringTime}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-zinc-400 hover:text-white transition-colors">
                      Configure
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
