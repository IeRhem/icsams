import Link from "next/link";

export default function CamerasPage() {
  const cameras = [
    {
      id: "CAM-01",
      name: "Main Entrance Gate",
      zone: "Zone 1 - Perimeter",
      ip: "192.168.1.101",
      res: "4K (3840x2160)",
      fps: 30,
      status: "ONLINE",
    },
    {
      id: "CAM-02",
      name: "Loading Dock B",
      zone: "Zone 2 - Logistics",
      ip: "192.168.1.102",
      res: "1080p (1920x1080)",
      fps: 30,
      status: "ALERT",
    },
    {
      id: "CAM-03",
      name: "Warehouse Hall A",
      zone: "Zone 3 - Storage",
      ip: "192.168.1.103",
      res: "1080p (1920x1080)",
      fps: 25,
      status: "ONLINE",
    },
    {
      id: "CAM-04",
      name: "North Perimeter Fence",
      zone: "Zone 4 - Perimeter",
      ip: "192.168.1.104",
      res: "4K (3840x2160)",
      fps: 30,
      status: "ALERT",
    },
    {
      id: "CAM-05",
      name: "Office Lobby Main",
      zone: "Zone 5 - Administration",
      ip: "192.168.1.105",
      res: "1080p (1920x1080)",
      fps: 30,
      status: "ONLINE",
    },
    {
      id: "CAM-06",
      name: "Parking Lot West",
      zone: "Zone 6 - Exterior",
      ip: "192.168.1.106",
      res: "1080p (1920x1080)",
      fps: 30,
      status: "ONLINE",
    },
    {
      id: "CAM-07",
      name: "Server Room East",
      zone: "Zone 7 - Critical Infrastructure",
      ip: "192.168.1.107",
      res: "1080p (1920x1080)",
      fps: 30,
      status: "ONLINE",
    },
    {
      id: "CAM-08",
      name: "South Emergency Exit",
      zone: "Zone 8 - Perimeter",
      ip: "192.168.1.108",
      res: "720p (1280x720)",
      fps: 15,
      status: "OFFLINE",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Camera Grid & Matrix</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Real-time IP camera feeds, PTZ positioning, and health telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 transition-colors">
            Matrix View (3x3)
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white transition-colors">
            + Register Camera
          </button>
        </div>
      </div>

      {/* Grid of Cameras */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cameras.map((cam) => (
          <div
            key={cam.id}
            className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden flex flex-col group hover:border-zinc-700 transition-colors"
          >
            {/* Live Video Window */}
            <div className="aspect-video bg-zinc-950 relative flex flex-col justify-between p-3">
              <div className="flex items-center justify-between z-10">
                <span className="text-[10px] font-mono bg-black/70 px-2 py-0.5 rounded text-zinc-300">
                  {cam.id}
                </span>
                <span
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    cam.status === "ONLINE"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : cam.status === "ALERT"
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      cam.status === "ALERT"
                        ? "bg-red-400 animate-ping"
                        : cam.status === "ONLINE"
                        ? "bg-emerald-400"
                        : "bg-zinc-500"
                    }`}
                  />
                  {cam.status}
                </span>
              </div>

              <div className="text-center text-xs font-mono text-zinc-600 select-none">
                {cam.status === "OFFLINE" ? "[SIGNAL LOST]" : "[LIVE RTSP FEED]"}
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 bg-black/40 px-2 py-0.5 rounded">
                <span>{cam.fps} FPS</span>
                <span>{cam.res.split(" ")[0]}</span>
              </div>
            </div>

            {/* Info and controls */}
            <div className="p-3.5 space-y-2.5">
              <div>
                <div className="text-xs font-semibold text-white">{cam.name}</div>
                <div className="text-[11px] text-zinc-400">{cam.zone}</div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-[11px]">
                <span className="font-mono text-zinc-400">{cam.ip}</span>
                <div className="flex items-center gap-2">
                  <Link
                    href="/footage"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Footage
                  </Link>
                  <button className="text-blue-400 hover:text-blue-300 transition-colors">
                    PTZ
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
