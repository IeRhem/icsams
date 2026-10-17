import Link from "next/link";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export const instant = false;

interface AlertDetailPageProps {
  params: Promise<{ alertsId: string }>;
}

async function AlertDetailContent({ params }: AlertDetailPageProps) {
  const { alertsId } = await params;

  return (
    <div className="space-y-6">
      {/* Breadcrumbs & Header */}
      <div>
        <Breadcrumb className="mb-3">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/alerts">Alerts</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="uppercase font-mono">{alertsId}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-foreground uppercase font-mono">
              Incident {alertsId}
            </h1>
            <Badge variant="destructive" className="font-mono font-bold text-xs">
              CRITICAL
            </Badge>
            <Badge variant="secondary" className="text-xs">
              OPEN
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Dispatch Security
            </Button>
            <Button size="sm">
              Mark Resolved
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Frame Detection Feed */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-0 overflow-hidden">
            <div className="p-3 border-b border-border bg-muted/40 flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-mono text-foreground font-medium">Cam-04 • North Perimeter Feed</span>
              <span>Trigger Time: 14:32:10 UTC</span>
            </div>

            <div className="relative aspect-video bg-zinc-950 flex items-center justify-center">
              {/* Simulated Bounding Box for Detected Object */}
              <div className="absolute top-1/4 left-1/3 w-36 h-48 border-2 border-destructive rounded bg-destructive/10 flex flex-col justify-between p-1.5 animate-pulse">
                <span className="bg-destructive text-[10px] text-destructive-foreground px-1 py-0.5 rounded font-mono font-bold">
                  Person [98.4%]
                </span>
                <span className="text-[9px] text-red-300 font-mono">Loitering: 42s</span>
              </div>

              <div className="text-muted-foreground text-xs font-mono select-none">
                [INCIDENT KEYFRAME SNAPSHOT]
              </div>

              <div className="absolute bottom-3 left-3 text-[11px] font-mono bg-black/70 px-2 py-1 rounded text-zinc-300 backdrop-blur-xs">
                Resolution: 1920x1080 • Sens: High
              </div>
            </div>
          </Card>

          <Card className="p-4 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Associated Footage Recording</span>
            <Link
              href="/footage"
              className={buttonVariants({ variant: "secondary", size: "sm" })}
            >
              Play Continuous Video Clip →
            </Link>
          </Card>
        </div>

        {/* Telemetry and Details */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Incident Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Trigger Rule</span>
                  <span className="text-foreground font-medium">Restricted Zone Loitering</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Detection Confidence</span>
                  <span className="text-emerald-500 font-mono font-semibold">98.4%</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Location</span>
                  <span className="text-foreground">Zone 4 (North Perimeter)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Camera Source</span>
                  <span className="text-primary font-mono">CAM-04 (192.168.1.104)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">AI Model Version</span>
                  <span className="text-foreground font-mono">yolov8-custom-v2.1</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Assigned Operator</span>
                  <span className="text-foreground">Admin Operator</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Operator Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                rows={3}
                placeholder="Add incident investigation notes..."
              />
              <Button className="w-full" size="sm">
                Save Note
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function AlertDetailPage(props: AlertDetailPageProps) {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-muted-foreground font-mono text-xs animate-pulse">
          Loading incident details...
        </div>
      }
    >
      <AlertDetailContent {...props} />
    </Suspense>
  );
}
