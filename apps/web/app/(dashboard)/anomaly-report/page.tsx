import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconBolt, IconDownload, IconEye } from "@tabler/icons-react";

export default function AnomalyReportPage() {
  const reports = [
    {
      id: "RPT-ANOM-2026-041",
      title: "Perimeter Loitering & Fence Proximity Cluster",
      date: "Generated: Today, 14:00",
      severity: "HIGH" as const,
      confidence: "97.2%",
      anomaliesCount: 8,
      status: "READY" as const,
    },
    {
      id: "RPT-ANOM-2026-040",
      title: "Loading Dock Forklift Speed Anomaly",
      date: "Generated: Yesterday, 18:30",
      severity: "MEDIUM" as const,
      confidence: "88.6%",
      anomaliesCount: 4,
      status: "READY" as const,
    },
    {
      id: "RPT-ANOM-2026-039",
      title: "Unattended Cargo Obstruction Analysis",
      date: "Generated: Oct 13, 2026",
      severity: "HIGH" as const,
      confidence: "93.1%",
      anomaliesCount: 6,
      status: "ARCHIVED" as const,
    },
    {
      id: "RPT-ANOM-2026-038",
      title: "After-Hours Facial Recognition Mismatch Rate",
      date: "Generated: Oct 11, 2026",
      severity: "LOW" as const,
      confidence: "84.0%",
      anomaliesCount: 2,
      status: "ARCHIVED" as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading">
            Anomaly Detection Reports
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Machine learning behavioral models detecting statistical deviations from normal patterns.
          </p>
        </div>

        <Button size="sm" className="gap-2">
          <IconBolt className="size-4" />
          <span>Generate New Report</span>
        </Button>
      </div>

      {/* Model Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>ML Model Status</CardDescription>
            <CardTitle className="text-lg font-bold text-emerald-500">Active & Calibrated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">Model: isolation-forest-v3</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Anomaly Baseline Drift</CardDescription>
            <CardTitle className="text-lg font-bold text-foreground">0.04 σ (Normal)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">Last retrained: 3 days ago</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Flagged Incidents This Week</CardDescription>
            <CardTitle className="text-lg font-bold text-amber-500">20 Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">Across 12 camera streams</div>
          </CardContent>
        </Card>
      </div>

      {/* Report List */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground">Generated Anomaly Summaries</h2>

        <div className="space-y-3">
          {reports.map((rpt) => (
            <Card
              key={rpt.id}
              className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-foreground/20 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs text-primary font-semibold">{rpt.id}</span>
                  <Badge
                    variant={
                      rpt.severity === "HIGH"
                        ? "destructive"
                        : rpt.severity === "MEDIUM"
                        ? "secondary"
                        : "outline"
                    }
                    className="font-mono text-[10px]"
                  >
                    {rpt.severity}
                  </Badge>
                  <span className="text-xs text-muted-foreground">• {rpt.date}</span>
                </div>
                <div className="text-sm font-medium text-foreground">{rpt.title}</div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                  <span>
                    Confidence: <span className="font-mono font-medium text-emerald-500">{rpt.confidence}</span>
                  </span>
                  <span>•</span>
                  <span>
                    Flagged Anomalies: <span className="font-medium text-foreground">{rpt.anomaliesCount}</span>
                  </span>
                  <span>•</span>
                  <span>
                    Status: <span className="uppercase text-[11px] font-mono">{rpt.status}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <Button variant="outline" size="xs" className="gap-1">
                  <IconEye className="size-3.5" />
                  <span>Inspect</span>
                </Button>
                <Button variant="secondary" size="xs" className="gap-1">
                  <IconDownload className="size-3.5" />
                  <span>PDF</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
