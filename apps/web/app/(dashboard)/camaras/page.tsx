import { CameraCard } from "@/components/camera-card";
import { Button } from "@/components/ui/button";

export default function CamerasPage() {
  const cameras = [
    {
      id: "CAM-01",
      name: "Main Entrance Gate",
      zone: "Zone 1 - Perimeter",
      ip: "192.168.1.101",
      res: "4K (3840x2160)",
      fps: 30,
      status: "ONLINE" as const,
    },
    {
      id: "CAM-02",
      name: "Loading Dock B",
      zone: "Zone 2 - Logistics",
      ip: "192.168.1.102",
      res: "1080p (1920x1080)",
      fps: 30,
      status: "ALERT" as const,
    },
    {
      id: "CAM-03",
      name: "Warehouse Hall A",
      zone: "Zone 3 - Storage",
      ip: "192.168.1.103",
      res: "1080p (1920x1080)",
      fps: 25,
      status: "ONLINE" as const,
    },
    {
      id: "CAM-04",
      name: "North Perimeter Fence",
      zone: "Zone 4 - Perimeter",
      ip: "192.168.1.104",
      res: "4K (3840x2160)",
      fps: 30,
      status: "ALERT" as const,
    },
    {
      id: "CAM-05",
      name: "Office Lobby Main",
      zone: "Zone 5 - Administration",
      ip: "192.168.1.105",
      res: "1080p (1920x1080)",
      fps: 30,
      status: "ONLINE" as const,
    },
    {
      id: "CAM-06",
      name: "Parking Lot West",
      zone: "Zone 6 - Exterior",
      ip: "192.168.1.106",
      res: "1080p (1920x1080)",
      fps: 30,
      status: "ONLINE" as const,
    },
    {
      id: "CAM-07",
      name: "Server Room East",
      zone: "Zone 7 - Critical Infrastructure",
      ip: "192.168.1.107",
      res: "1080p (1920x1080)",
      fps: 30,
      status: "ONLINE" as const,
    },
    {
      id: "CAM-08",
      name: "South Emergency Exit",
      zone: "Zone 8 - Perimeter",
      ip: "192.168.1.108",
      res: "720p (1280x720)",
      fps: 15,
      status: "OFFLINE" as const,
    },
  ];

  return (
    <div className="space-y-6 w-full min-w-0 max-w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading">
            Camera Grid & Matrix
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time IP camera feeds, PTZ positioning, and health telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Matrix View (3x3)
          </Button>
          <Button size="sm">
            + Register Camera
          </Button>
        </div>
      </div>

      {/* Grid of Cameras */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cameras.map((cam) => (
          <CameraCard key={cam.id} camera={cam} variant="detailed" />
        ))}
      </div>
    </div>
  );
}
