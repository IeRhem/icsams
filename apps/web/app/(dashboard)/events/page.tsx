import Link from "next/link";

export default function EventsPage() {
  const events = [
    {
      id: "EVT-9102",
      type: "Motion Trigger",
      camera: "Cam-01 (Main Gate)",
      duration: "14s",
      objects: "Vehicle (Van), Person (1)",
      time: "14:41:05",
      severity: "LOW",
    },
    {
      id: "EVT-9101",
      type: "Zone Intrusion",
      camera: "Cam-04 (North Perimeter)",
      duration: "48s",
      objects: "Person (Unknown)",
      time: "14:32:08",
      severity: "CRITICAL",
    },
    {
      id: "EVT-9098",
      type: "Object Static Abandon",
      camera: "Cam-02 (Loading Dock B)",
      duration: "10m 22s",
      objects: "Backpack / Package",
      time: "14:18:40",
      severity: "HIGH",
    },
    {
      id: "EVT-9094",
      type: "Face Recognized",
      camera: "Cam-05 (Office Lobby)",
      duration: "4s",
      objects: "Staff: Marcus Vance (ID: 4402)",
      time: "14:02:18",
      severity: "INFO",
    },
    {
      id: "EVT-9090",
      type: "Door Access Unlocked",
      camera: "Cam-07 (Server Room)",
      duration: "32s",
      objects: "Keycard Access Granted",
      time: "13:43:55",
      severity: "INFO",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Event Log Stream</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Historical computer vision detections, object tracking events, and sensory triggers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search events or cameras..."
            className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-blue-500"
          />
          <button className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 transition-colors">
            Export CSV
          </button>
        </div>
      </div>

      {/* Events Table */}
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-900 border-b border-zinc-800 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            <tr>
              <th className="px-5 py-3">Event ID</th>
              <th className="px-5 py-3">Classification</th>
              <th className="px-5 py-3">Camera Source</th>
              <th className="px-5 py-3">Detected Entities</th>
              <th className="px-5 py-3">Duration</th>
              <th className="px-5 py-3">Timestamp</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/70 text-zinc-300">
            {events.map((evt) => (
              <tr key={evt.id} className="hover:bg-zinc-800/40 transition-colors">
                <td className="px-5 py-4 font-mono text-xs font-medium text-blue-400">
                  <Link href={`/events/${evt.id.toLowerCase()}`} className="hover:underline">
                    {evt.id}
                  </Link>
                </td>
                <td className="px-5 py-4">
                  <span className="font-medium text-white">{evt.type}</span>
                </td>
                <td className="px-5 py-4 text-xs text-zinc-400">{evt.camera}</td>
                <td className="px-5 py-4 text-xs text-zinc-300">{evt.objects}</td>
                <td className="px-5 py-4 text-xs font-mono text-zinc-400">{evt.duration}</td>
                <td className="px-5 py-4 text-xs text-zinc-400">{evt.time}</td>
                <td className="px-5 py-4 text-right">
                  <Link
                    href={`/events/${evt.id.toLowerCase()}`}
                    className="text-xs px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
                  >
                    Inspect
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
