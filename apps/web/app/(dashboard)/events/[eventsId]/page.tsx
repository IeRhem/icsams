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

export const instant = false;

interface EventDetailPageProps {
  params: Promise<{ eventsId: string }>;
}

async function EventDetailContent({ params }: EventDetailPageProps) {
  const { eventsId } = await params;

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumb className="mb-3">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/events">Events</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="uppercase font-mono">{eventsId}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-foreground uppercase font-mono">
              Event {eventsId}
            </h1>
            <Badge variant="secondary" className="font-mono text-xs">
              Zone Intrusion
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/footage"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Watch Video
            </Link>
            <Button size="sm">
              Export Telemetry
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-0 overflow-hidden">
            <div className="p-3 border-b border-border bg-muted/40 flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Detection Playback Feed</span>
              <span className="font-mono">Timestamp: 14:32:08.412 UTC</span>
            </div>
            <div className="aspect-video bg-zinc-950 flex flex-col items-center justify-center relative">
              <div className="text-muted-foreground text-xs font-mono select-none">[EVENT RECORDING PLAYBACK]</div>
              <div className="absolute bottom-3 left-3 flex gap-2 font-mono text-[10px] bg-black/70 px-2 py-1 rounded text-zinc-300 backdrop-blur-xs">
                <span>FPS: 30</span>
                <span>•</span>
                <span>TrackID: #4012</span>
                <span>•</span>
                <span className="text-emerald-400">Confidence: 96.8%</span>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Detected Object Bounding Boxes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-3 rounded-lg bg-muted/30 border border-border flex justify-between items-center">
                  <span className="font-medium text-foreground">Class: Person (ID: #4012)</span>
                  <span className="text-muted-foreground">Box: [x: 412, y: 180, w: 94, h: 220]</span>
                  <Badge variant="secondary" className="text-emerald-500 font-mono">96.8%</Badge>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 border border-border flex justify-between items-center">
                  <span className="font-medium text-foreground">Class: Backpack</span>
                  <span className="text-muted-foreground">Box: [x: 430, y: 280, w: 40, h: 55]</span>
                  <Badge variant="secondary" className="text-emerald-500 font-mono">89.1%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Metadata & Sensor Specs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-border">
                  <span className="text-muted-foreground">Camera Source</span>
                  <span className="text-foreground font-medium">Cam-04 North</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-border">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="text-foreground">48 seconds</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-border">
                  <span className="text-muted-foreground">Frame Index</span>
                  <span className="text-foreground font-mono">14,290</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-border">
                  <span className="text-muted-foreground">Pipeline Model</span>
                  <span className="text-foreground font-mono">yolov8-detect</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-muted-foreground">Inference Device</span>
                  <span className="text-foreground font-mono">CUDA / RTX 4090</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function EventDetailPage(props: EventDetailPageProps) {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-muted-foreground font-mono text-xs animate-pulse">
          Loading event telemetry...
        </div>
      }
    >
      <EventDetailContent {...props} />
    </Suspense>
  );
}
