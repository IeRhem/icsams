import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function EventsPage() {
  const events = [
    {
      id: "EVT-9102",
      type: "Motion Trigger",
      camera: "Cam-01 (Main Gate)",
      duration: "14s",
      objects: "Vehicle (Van), Person (1)",
      time: "14:41:05",
      severity: "LOW" as const,
    },
    {
      id: "EVT-9101",
      type: "Zone Intrusion",
      camera: "Cam-04 (North Perimeter)",
      duration: "48s",
      objects: "Person (Unknown)",
      time: "14:32:08",
      severity: "CRITICAL" as const,
    },
    {
      id: "EVT-9098",
      type: "Object Static Abandon",
      camera: "Cam-02 (Loading Dock B)",
      duration: "10m 22s",
      objects: "Backpack / Package",
      time: "14:18:40",
      severity: "HIGH" as const,
    },
    {
      id: "EVT-9094",
      type: "Face Recognized",
      camera: "Cam-05 (Office Lobby)",
      duration: "4s",
      objects: "Staff: Marcus Vance (ID: 4402)",
      time: "14:02:18",
      severity: "INFO" as const,
    },
    {
      id: "EVT-9090",
      type: "Door Access Unlocked",
      camera: "Cam-07 (Server Room)",
      duration: "32s",
      objects: "Keycard Access Granted",
      time: "13:43:55",
      severity: "INFO" as const,
    },
  ];

  return (
    <div className="space-y-6 w-full min-w-0 max-w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading">
            Event Log Stream
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Historical computer vision detections, object tracking events, and sensory triggers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Search events or cameras..."
            className="w-56"
          />
          <Button variant="outline" size="sm">
            Export CSV
          </Button>
        </div>
      </div>

      {/* Events Table */}
      <Card className="p-0 overflow-hidden min-w-0 max-w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Event ID</TableHead>
              <TableHead>Classification</TableHead>
              <TableHead>Camera Source</TableHead>
              <TableHead>Detected Entities</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((evt) => (
              <TableRow key={evt.id}>
                <TableCell className="font-mono text-xs font-semibold text-primary">
                  <Link href={`/events/${evt.id.toLowerCase()}`} className="hover:underline">
                    {evt.id}
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{evt.type}</span>
                    {evt.severity === "CRITICAL" && (
                      <Badge variant="destructive" className="text-[10px]">Critical</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{evt.camera}</TableCell>
                <TableCell className="text-xs text-foreground">{evt.objects}</TableCell>
                <TableCell className="text-xs font-mono text-muted-foreground">{evt.duration}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{evt.time}</TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/events/${evt.id.toLowerCase()}`}
                    className={buttonVariants({ variant: "outline", size: "xs" })}
                  >
                    Inspect
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
