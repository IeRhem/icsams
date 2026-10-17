import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { CameraCard } from "@/components/camera-card";
import { IconChevronRight } from "@tabler/icons-react";

export default function DashboardPage() {
  const stats = [
    { label: "Active Cameras", value: "12 / 12", change: "+0 offline", status: "good" as const },
    { label: "Unresolved Alerts", value: "3", change: "2 critical", status: "alert" as const },
    { label: "Events Logged (24h)", value: "1,248", change: "+14% vs yesterday", status: "neutral" as const },
    { label: "AI Latency (Avg)", value: "42 ms", change: "Normal load", status: "good" as const },
  ];

  const recentAlerts = [
    {
      id: "alt-8092",
      camera: "Cam-04 • North Perimeter",
      rule: "Restricted Zone Loitering",
      severity: "CRITICAL" as const,
      time: "2 mins ago",
      confidence: "98.4%",
    },
    {
      id: "alt-8091",
      camera: "Cam-02 • Loading Dock B",
      rule: "Object Left Unattended",
      severity: "HIGH" as const,
      time: "14 mins ago",
      confidence: "91.2%",
    },
    {
      id: "alt-8089",
      camera: "Cam-07 • Server Room East",
      rule: "Unauthorized Access Attempt",
      severity: "HIGH" as const,
      time: "48 mins ago",
      confidence: "94.7%",
    },
  ];

  const cameraStreams = [
    { id: "cam-01", name: "Main Entrance Gate", status: "ONLINE", location: "Perimeter", fps: 30 },
    { id: "cam-02", name: "Loading Dock B", status: "ALERT", location: "Logistics", fps: 30 },
    { id: "cam-03", name: "Warehouse Hall A", status: "ONLINE", location: "Storage", fps: 25 },
    { id: "cam-04", name: "North Perimeter", status: "ALERT", location: "Perimeter", fps: 30 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          System Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Real-time intelligent surveillance monitoring, telemetry, and threat detection.
        </p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-2xl font-bold tabular-nums">
                {stat.value}
              </CardTitle>
              <CardAction>
                <Badge
                  variant={
                    stat.status === "alert"
                      ? "destructive"
                      : stat.status === "good"
                      ? "secondary"
                      : "outline"
                  }
                >
                  <span
                    className={`inline-block size-1.5 rounded-full mr-1 ${
                      stat.status === "alert"
                        ? "bg-destructive animate-ping"
                        : stat.status === "good"
                        ? "bg-emerald-500"
                        : "bg-blue-400"
                    }`}
                  />
                  {stat.change}
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Interactive AI Telemetry Chart */}
      <ChartAreaInteractive
        title="System Activity & Detections"
        descriptionText="Hourly sensory telemetry and camera trigger frequency across monitored zones"
      />

      {/* Live Stream Previews */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground font-heading">
              Live Camera Highlights
            </h2>
            <p className="text-xs text-muted-foreground">
              Primary priority streams with active computer vision analytics
            </p>
          </div>
          <Link
            href="/camaras"
            className="text-xs text-primary hover:underline flex items-center gap-1 font-medium"
          >
            View all 12 streams <IconChevronRight className="size-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cameraStreams.map((cam) => (
            <CameraCard key={cam.id} camera={cam} />
          ))}
        </div>
      </div>

      {/* Recent Alerts Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground font-heading">
              Recent Urgent Alerts
            </h2>
            <p className="text-xs text-muted-foreground">
              Highest priority anomaly and zone intrusion notifications
            </p>
          </div>
          <Link
            href="/alerts"
            className="text-xs text-primary hover:underline flex items-center gap-1 font-medium"
          >
            All alerts <IconChevronRight className="size-3" />
          </Link>
        </div>

        <Card className="p-0 overflow-hidden">
          <div className="divide-y divide-border">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className="p-4 flex items-center justify-between hover:bg-muted/40 transition-colors gap-4"
              >
                <div className="flex items-center gap-3">
                  <Badge
                    variant={alert.severity === "CRITICAL" ? "destructive" : "secondary"}
                    className="font-mono text-xs"
                  >
                    {alert.severity}
                  </Badge>
                  <div>
                    <Link
                      href={`/alerts/${alert.id}`}
                      className="text-sm font-semibold text-foreground hover:underline"
                    >
                      {alert.rule}
                    </Link>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {alert.camera}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <div className="text-xs text-foreground font-mono">
                      Conf: {alert.confidence}
                    </div>
                    <div className="text-[11px] text-muted-foreground">{alert.time}</div>
                  </div>
                  <Link
                    href={`/alerts/${alert.id}`}
                    className={buttonVariants({ variant: "outline", size: "sm" })}
                  >
                    Investigate
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
