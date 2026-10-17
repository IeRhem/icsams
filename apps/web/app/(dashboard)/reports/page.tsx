import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconDownload, IconFileText, IconPlus } from "@tabler/icons-react";

export default function ReportsPage() {
  const reports = [
    {
      id: "RPT-2026-W41",
      title: "Weekly Security & Incident Audit Digest",
      period: "Oct 08, 2026 - Oct 15, 2026",
      generatedBy: "System Automated Cron",
      format: "PDF (3.2 MB)",
      incidents: 42,
    },
    {
      id: "RPT-2026-M09",
      title: "Monthly Perimeter Breach & Loitering Audit",
      period: "Sep 01, 2026 - Sep 30, 2026",
      generatedBy: "Admin Operator",
      format: "PDF (8.1 MB)",
      incidents: 128,
    },
    {
      id: "RPT-2026-SLA",
      title: "CCTV Hardware Uptime & Telemetry Reliability",
      period: "Q3 2026 (Jul - Sep)",
      generatedBy: "DevOps Monitoring",
      format: "CSV (450 KB)",
      incidents: 3,
    },
    {
      id: "RPT-2026-COMP",
      title: "Facility Access Compliance & Audit Trail",
      period: "Oct 01, 2026 - Oct 14, 2026",
      generatedBy: "System Automated Cron",
      format: "PDF (2.8 MB)",
      incidents: 19,
    },
  ];

  return (
    <div className="space-y-6 w-full min-w-0 max-w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading">
            Compliance & Audit Reports
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Export executive security summaries, incident audit logs, and hardware reliability metrics.
          </p>
        </div>

        <Button size="sm" className="gap-1.5 shrink-0">
          <IconPlus className="size-4" />
          <span>Generate New Report</span>
        </Button>
      </div>

      {/* Reports Table */}
      <Card className="p-0 overflow-hidden min-w-0 max-w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[140px]">Report ID</TableHead>
              <TableHead className="min-w-[240px]">Document Title</TableHead>
              <TableHead className="min-w-[170px]">Coverage Period</TableHead>
              <TableHead className="min-w-[150px]">Author</TableHead>
              <TableHead className="w-[110px]">Format</TableHead>
              <TableHead className="w-[100px] text-right">Download</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-mono text-xs font-semibold text-primary">
                  <div className="flex items-center gap-1.5">
                    <IconFileText className="size-3.5 text-muted-foreground shrink-0" />
                    <span>{r.id}</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium text-foreground whitespace-normal">
                  {r.title}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{r.period}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{r.generatedBy}</TableCell>
                <TableCell className="text-xs font-mono text-muted-foreground">{r.format}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="xs" className="gap-1">
                    <IconDownload className="size-3" />
                    <span>Download</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Automated Delivery Schedules */}
      <Card className="p-5 space-y-4 min-w-0 max-w-full">
        <h2 className="text-sm font-semibold text-foreground">Automated Delivery Schedules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-muted/40 border border-border flex justify-between items-center text-xs">
            <div>
              <div className="font-medium text-foreground">Weekly Executive Summary</div>
              <div className="text-muted-foreground mt-0.5">Every Monday at 06:00 UTC • Sent to security@icsams.local</div>
            </div>
            <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded">
              Active
            </span>
          </div>

          <div className="p-4 rounded-lg bg-muted/40 border border-border flex justify-between items-center text-xs">
            <div>
              <div className="font-medium text-foreground">Monthly Compliance Digest</div>
              <div className="text-muted-foreground mt-0.5">1st of every month at 00:00 UTC • Sent to compliance@icsams.local</div>
            </div>
            <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded">
              Active
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
