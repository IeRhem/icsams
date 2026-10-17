import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

type AlertItem = {
  id: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  title: string;
  camera: string;
  timestamp: string;
  status: "OPEN" | "INVESTIGATING" | "RESOLVED";
  confidence: string;
};

const alerts: AlertItem[] = [
  {
    id: "ALT-8092",
    severity: "CRITICAL",
    title: "Restricted Zone Loitering",
    camera: "Cam-04 (North Perimeter)",
    timestamp: "Today, 14:32:10",
    status: "OPEN",
    confidence: "98.4%",
  },
  {
    id: "ALT-8091",
    severity: "HIGH",
    title: "Object Left Unattended > 10m",
    camera: "Cam-02 (Loading Dock B)",
    timestamp: "Today, 14:18:45",
    status: "INVESTIGATING",
    confidence: "91.2%",
  },
  {
    id: "ALT-8089",
    severity: "HIGH",
    title: "Unauthorized After-Hours Movement",
    camera: "Cam-07 (Server Room East)",
    timestamp: "Today, 13:44:02",
    status: "OPEN",
    confidence: "94.7%",
  },
  {
    id: "ALT-8085",
    severity: "MEDIUM",
    title: "Perimeter Motion Spike",
    camera: "Cam-09 (South Fence Gate)",
    timestamp: "Today, 11:20:15",
    status: "RESOLVED",
    confidence: "82.5%",
  },
  {
    id: "ALT-8078",
    severity: "LOW",
    title: "Camera Field Obstruction Warning",
    camera: "Cam-01 (Main Entrance Gate)",
    timestamp: "Today, 09:12:44",
    status: "RESOLVED",
    confidence: "78.0%",
  },
];

function AlertsTable({ items }: { items: AlertItem[] }) {
  if (items.length === 0) {
    return (
      <Card className="p-8 text-center text-sm text-muted-foreground min-w-0 max-w-full">
        No alerts found in this view.
      </Card>
    );
  }

  return (
    <Card className="p-0 overflow-hidden min-w-0 max-w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-27.5">Alert ID</TableHead>
            <TableHead className="w-27.5">Severity</TableHead>
            <TableHead className="min-w-50">Trigger / Description</TableHead>
            <TableHead className="min-w-45">Camera Source</TableHead>
            <TableHead className="w-25">Confidence</TableHead>
            <TableHead className="min-w-32.5">Timestamp</TableHead>
            <TableHead className="w-30">Status</TableHead>
            <TableHead className="w-22.5 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-mono text-xs font-semibold text-primary">
                <Link href={`/alerts/${item.id.toLowerCase()}`} className="hover:underline">
                  {item.id}
                </Link>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    item.severity === "CRITICAL"
                      ? "destructive"
                      : item.severity === "HIGH"
                      ? "secondary"
                      : "outline"
                  }
                  className="font-mono text-[11px]"
                >
                  {item.severity}
                </Badge>
              </TableCell>
              <TableCell className="font-medium text-foreground whitespace-normal">
                {item.title}
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {item.camera}
              </TableCell>
              <TableCell className="text-xs font-mono">
                {item.confidence}
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {item.timestamp}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    item.status === "OPEN"
                      ? "destructive"
                      : item.status === "INVESTIGATING"
                      ? "secondary"
                      : "outline"
                  }
                  className="text-[11px]"
                >
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Link
                  href={`/alerts/${item.id.toLowerCase()}`}
                  className={buttonVariants({ variant: "outline", size: "xs" })}
                >
                  Details
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

export default function AlertsPage() {
  const criticalCount = alerts.filter((a) => a.severity === "CRITICAL").length;
  const highCount = alerts.filter((a) => a.severity === "HIGH").length;
  const resolvedCount = alerts.filter((a) => a.status === "RESOLVED").length;

  return (
    <div className="space-y-6 w-full min-w-0 max-w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading">
            Alerts & Incidents
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time notifications triggered by vision AI threat detection rules.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" size="sm">
            Acknowledge All
          </Button>
          <Button size="sm">
            Configure Rules
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <Tabs defaultValue="all" className="w-full gap-4 min-w-0 max-w-full">
        <div className="overflow-x-auto min-w-0 max-w-full pb-1">
          <TabsList>
            <TabsTrigger value="all">
              All Alerts
              <Badge variant="secondary" className="ml-1.5 font-mono text-[11px] px-1.5 py-0">
                {alerts.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="critical">
              Critical
              <Badge variant="secondary" className="ml-1.5 font-mono text-[11px] px-1.5 py-0">
                {criticalCount}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="high">
              High
              <Badge variant="secondary" className="ml-1.5 font-mono text-[11px] px-1.5 py-0">
                {highCount}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="resolved">
              Resolved
              <Badge variant="secondary" className="ml-1.5 font-mono text-[11px] px-1.5 py-0">
                {resolvedCount}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="min-w-0 max-w-full">
          <AlertsTable items={alerts} />
        </TabsContent>
        <TabsContent value="critical" className="min-w-0 max-w-full">
          <AlertsTable items={alerts.filter((a) => a.severity === "CRITICAL")} />
        </TabsContent>
        <TabsContent value="high" className="min-w-0 max-w-full">
          <AlertsTable items={alerts.filter((a) => a.severity === "HIGH")} />
        </TabsContent>
        <TabsContent value="resolved" className="min-w-0 max-w-full">
          <AlertsTable items={alerts.filter((a) => a.status === "RESOLVED")} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
