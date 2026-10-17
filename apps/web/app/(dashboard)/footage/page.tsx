import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  IconBookmark,
  IconDeviceFloppy,
  IconPlayerPause,
  IconPlayerSkipBack,
  IconPlayerSkipForward,
} from "@tabler/icons-react";

export default function FootagePage() {
  const recordedSegments = [
    { time: "14:30 - 14:45", events: "1 Critical Alert", size: "1.4 GB", status: "FLAGGED" as const },
    { time: "14:15 - 14:30", events: "1 High Warning", size: "1.4 GB", status: "FLAGGED" as const },
    { time: "14:00 - 14:15", events: "Continuous Rec", size: "1.3 GB", status: "NORMAL" as const },
    { time: "13:45 - 14:00", events: "Continuous Rec", size: "1.3 GB", status: "NORMAL" as const },
    { time: "13:30 - 13:45", events: "1 Access Event", size: "1.4 GB", status: "NORMAL" as const },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading">
            Footage Playback & Archive
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Browse, scrub, and export NVR continuous recordings and incident clips.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          <select className="bg-input/30 border border-input rounded-md px-3 py-1.5 text-xs text-foreground outline-none focus:border-ring">
            <option>CAM-04 (North Perimeter Fence)</option>
            <option>CAM-01 (Main Entrance Gate)</option>
            <option>CAM-02 (Loading Dock B)</option>
            <option>CAM-07 (Server Room East)</option>
          </select>
          <Input
            type="date"
            defaultValue="2026-10-15"
            className="w-36 text-xs h-8"
          />
        </div>
      </div>

      {/* Main Video Player */}
      <Card className="p-0 overflow-hidden">
        <div className="aspect-video bg-zinc-950 relative flex flex-col justify-between p-4">
          <div className="flex items-center justify-between text-xs text-zinc-300 font-mono">
            <div className="flex items-center gap-2 bg-black/60 px-2.5 py-1 rounded backdrop-blur-xs">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>PLAYING: CAM-04 (NORTH PERIMETER)</span>
            </div>
            <div className="bg-black/60 px-2.5 py-1 rounded backdrop-blur-xs">2026-10-15 14:32:10 UTC</div>
          </div>

          <div className="text-center font-mono text-muted-foreground select-none text-sm">
            [ARCHIVED RECORDING STREAM]
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="font-mono bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">H.265 • 30 FPS • 4K</span>
            <span className="font-mono bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">Scrub Position: 00:32:10 / 01:00:00</span>
          </div>
        </div>

        {/* Player Controls & Scrubber */}
        <div className="p-4 border-t border-border bg-card space-y-3">
          {/* Timeline Bar with Event Markers */}
          <div className="space-y-1">
            <div className="relative h-6 bg-muted/40 rounded border border-border flex items-center px-1">
              {/* Event highlight segments */}
              <div
                className="absolute h-full bg-destructive/40 border-l-2 border-r-2 border-destructive rounded"
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
                className="absolute top-0 bottom-0 w-1 bg-primary shadow-xs shadow-primary"
                style={{ left: "54%" }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
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
              <Button variant="outline" size="sm" className="gap-1">
                <IconPlayerSkipBack className="size-3.5" />
                <span>10s</span>
              </Button>
              <Button size="sm" className="gap-1.5 font-semibold">
                <IconPlayerPause className="size-3.5" />
                <span>Pause</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <span>10s</span>
                <IconPlayerSkipForward className="size-3.5" />
              </Button>
              <div className="flex items-center gap-1 pl-2">
                <Button variant="secondary" size="xs">1x</Button>
                <Button variant="ghost" size="xs">2x</Button>
                <Button variant="ghost" size="xs">4x</Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1.5">
                <IconBookmark className="size-3.5" />
                <span>Bookmark</span>
              </Button>
              <Button size="sm" className="gap-1.5">
                <IconDeviceFloppy className="size-3.5" />
                <span>Export Clip</span>
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Segments List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Archived 15-Minute Video Segments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            {recordedSegments.map((seg) => (
              <div key={seg.time} className="py-3 flex items-center justify-between text-xs first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-foreground font-medium">{seg.time}</span>
                  <Badge
                    variant={seg.status === "FLAGGED" ? "destructive" : "secondary"}
                    className="font-mono text-[10px]"
                  >
                    {seg.events}
                  </Badge>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground font-mono">{seg.size}</span>
                  <Button variant="outline" size="xs">
                    Load in Player
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
