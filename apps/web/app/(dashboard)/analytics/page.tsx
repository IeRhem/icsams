import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";

export default function AnalyticsPage() {
  const categories = [
    { name: "Unauthorized Loitering", count: 42, percentage: 38, color: "bg-destructive" },
    { name: "Abandoned Packages / Items", count: 28, percentage: 25, color: "bg-amber-500" },
    { name: "Perimeter Motion Trips", count: 24, percentage: 22, color: "bg-blue-500" },
    { name: "Door Access Anomalies", count: 16, percentage: 15, color: "bg-purple-500" },
  ];

  const zoneRisk = [
    { zone: "North Perimeter (Zone 4)", incidents: 38, risk: "CRITICAL" as const, trend: "+12%" },
    { zone: "Loading Dock B (Zone 2)", incidents: 29, risk: "HIGH" as const, trend: "-5%" },
    { zone: "Server Room East (Zone 7)", incidents: 14, risk: "HIGH" as const, trend: "+2%" },
    { zone: "South Fence Gate (Zone 9)", incidents: 11, risk: "MEDIUM" as const, trend: "-18%" },
    { zone: "Main Entrance (Zone 1)", incidents: 6, risk: "LOW" as const, trend: "0%" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading">
            Security & Threat Analytics
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Aggregated computer vision telemetry, recurring pattern anomalies, and risk indices.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-muted/50 border border-border rounded-lg p-1 text-xs">
          <Button variant="secondary" size="xs">24 Hours</Button>
          <Button variant="ghost" size="xs">7 Days</Button>
          <Button variant="ghost" size="xs">30 Days</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Detections</CardDescription>
            <CardTitle className="text-2xl font-bold tabular-nums">1,248</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-emerald-500 font-medium">↑ +8.4% vs last cycle</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>False Positive Rate</CardDescription>
            <CardTitle className="text-2xl font-bold tabular-nums">1.2%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-emerald-500 font-medium">↓ -0.4% improvement</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg Response Time</CardDescription>
            <CardTitle className="text-2xl font-bold tabular-nums">1m 45s</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">Security dispatch SLA</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>High Risk Incidents</CardDescription>
            <CardTitle className="text-2xl font-bold tabular-nums text-destructive">18</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-amber-500 font-medium">3 pending review</div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Recharts Telemetry Chart */}
      <ChartAreaInteractive
        title="Hourly Detection & Movement Telemetry"
        descriptionText="Event velocity and triggers indexed across all optical sensors"
      />

      {/* Category Breakdown & Zone Risk Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Detection Type Breakdown</CardTitle>
            <CardDescription>Distribution of event classifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {categories.map((cat) => (
              <div key={cat.name} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-foreground">{cat.name}</span>
                  <span className="text-muted-foreground font-mono">{cat.count} ({cat.percentage}%)</span>
                </div>
                <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                  <div
                    className={`${cat.color} h-full rounded-full transition-all`}
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Zone Threat Exposure</CardTitle>
            <CardDescription>Risk level and active incidents by perimeter zone</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border">
              {zoneRisk.map((z) => (
                <div key={z.zone} className="py-3 flex items-center justify-between text-xs first:pt-0 last:pb-0">
                  <div>
                    <div className="text-foreground font-medium">{z.zone}</div>
                    <div className="text-muted-foreground mt-0.5">{z.incidents} incidents recorded</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        z.risk === "CRITICAL"
                          ? "destructive"
                          : z.risk === "HIGH"
                          ? "secondary"
                          : "outline"
                      }
                      className="font-mono text-[10px]"
                    >
                      {z.risk}
                    </Badge>
                    <span className="text-muted-foreground font-mono text-[11px]">{z.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
