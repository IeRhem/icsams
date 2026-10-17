import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ThresholdsPage() {
  const zoneOverrides = [
    { zone: "Zone 1 - Main Entrance", sensitivity: "Medium (75%)", minConfidence: "80%", loiteringTime: "45s" },
    { zone: "Zone 4 - North Perimeter", sensitivity: "High (95%)", minConfidence: "70%", loiteringTime: "15s" },
    { zone: "Zone 7 - Server Room East", sensitivity: "Maximum (99%)", minConfidence: "65%", loiteringTime: "5s" },
    { zone: "Zone 2 - Loading Dock B", sensitivity: "Low (50%)", minConfidence: "85%", loiteringTime: "120s" },
  ];

  return (
    <div className="space-y-6 w-full min-w-0 max-w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading">
            Detection Thresholds & Sensitivity
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Configure machine vision trigger rules, loitering limits, and confidence cutoff percentages.
          </p>
        </div>

        <Button size="sm">
          Save Configuration
        </Button>
      </div>

      {/* Global Detection Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Global Vision Sensitivity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-foreground font-medium">Minimum Classification Confidence</span>
                <span className="font-mono text-primary font-semibold">85%</span>
              </div>
              <input
                type="range"
                min="50"
                max="99"
                defaultValue="85"
                className="w-full accent-primary"
              />
              <span className="text-[11px] text-muted-foreground">
                Detections below this probability threshold are discarded as noise.
              </span>
            </div>

            <div className="space-y-2 pt-2 border-t border-border">
              <div className="flex justify-between">
                <span className="text-foreground font-medium">Loitering Time Trigger</span>
                <span className="font-mono text-primary font-semibold">30 seconds</span>
              </div>
              <input
                type="range"
                min="5"
                max="120"
                defaultValue="30"
                className="w-full accent-primary"
              />
              <span className="text-[11px] text-muted-foreground">
                Duration a tracked person remains stationary before triggering an alert.
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Static Object & Motion Calibration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-foreground font-medium">Abandoned Object Timeout</span>
                <span className="font-mono text-primary font-semibold">5 minutes</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                defaultValue="5"
                className="w-full accent-primary"
              />
              <span className="text-[11px] text-muted-foreground">
                Time an unattended item must remain motionless before raising an alarm.
              </span>
            </div>

            <div className="space-y-2 pt-2 border-t border-border">
              <div className="flex justify-between">
                <span className="text-foreground font-medium">Night Mode Multiplier</span>
                <span className="font-mono text-primary font-semibold">1.4x Sens</span>
              </div>
              <input
                type="range"
                min="1"
                max="2"
                step="0.1"
                defaultValue="1.4"
                className="w-full accent-primary"
              />
              <span className="text-[11px] text-muted-foreground">
                Boosts infrared and low-light optical sensitivity between 20:00 - 06:00.
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Per Zone Overrides Table */}
      <Card className="p-0 overflow-hidden min-w-0 max-w-full">
        <div className="p-4 flex items-center justify-between border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">Per-Zone Sensitivity Overrides</h2>
          <Button variant="ghost" size="xs">
            + Add Zone Rule
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Security Zone</TableHead>
              <TableHead>Preset Sensitivity</TableHead>
              <TableHead>Min Confidence</TableHead>
              <TableHead>Loitering Threshold</TableHead>
              <TableHead className="text-right">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {zoneOverrides.map((zo) => (
              <TableRow key={zo.zone}>
                <TableCell className="font-medium text-foreground">{zo.zone}</TableCell>
                <TableCell className="font-mono text-xs">{zo.sensitivity}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-mono text-emerald-500 text-[11px]">
                    {zo.minConfidence}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{zo.loiteringTime}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="xs">
                    Configure
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
