import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type CameraStatus = "ONLINE" | "ALERT" | "OFFLINE" | string;

export interface CameraStream {
  id: string;
  name: string;
  status: CameraStatus;
  location?: string;
  zone?: string;
  fps?: number;
  res?: string;
  ip?: string;
}

export interface CameraCardProps {
  camera?: CameraStream;
  id?: string;
  name?: string;
  status?: CameraStatus;
  location?: string;
  zone?: string;
  fps?: number;
  res?: string;
  ip?: string;
  historyHref?: string;
  actionLabel?: string;
  variant?: "compact" | "detailed";
  className?: string;
}

export function CameraCard({
  camera,
  id: propId,
  name: propName,
  status: propStatus,
  location: propLocation,
  zone: propZone,
  fps: propFps,
  res: propRes,
  ip: propIp,
  historyHref = "/footage",
  actionLabel = "History",
  variant = "compact",
  className,
}: CameraCardProps) {
  const id = camera?.id ?? propId ?? "CAM-00";
  const name = camera?.name ?? propName ?? "Camera Stream";
  const status = camera?.status ?? propStatus ?? "ONLINE";
  const location = camera?.location ?? propLocation;
  const zone = camera?.zone ?? propZone;
  const fps = camera?.fps ?? propFps;
  const res = camera?.res ?? propRes;
  const ip = camera?.ip ?? propIp;

  const isAlert = status === "ALERT";
  const isOffline = status === "OFFLINE";
  const isOnline = status === "ONLINE";

  const badgeVariant = isAlert
    ? "destructive"
    : isOnline
    ? "secondary"
    : "outline";

  const statusDotClass = isAlert
    ? "bg-destructive animate-ping"
    : isOnline
    ? "bg-emerald-400"
    : "bg-muted-foreground";

  return (
    <Card
      className={cn(
        "overflow-hidden group flex flex-col p-0 min-w-0 max-w-full hover:border-foreground/20 transition-colors",
        className
      )}
    >
      {/* Live Video Window */}
      <div
        className={cn(
          "bg-zinc-950 flex flex-col justify-between p-3 relative rounded-b-xl",
          variant === "detailed" ? "aspect-video" : "h-40"
        )}
      >
        <div className="flex items-center justify-between z-10">
          <span className="text-[10px] font-mono bg-background/80 text-foreground px-2 py-0.5 rounded backdrop-blur-xs">
            {id.toUpperCase()}
          </span>
          <Badge variant={badgeVariant} className="gap-1 font-mono text-[10px]">
            <span className={cn("size-1.5 rounded-full", statusDotClass)} />
            {status}
          </Badge>
        </div>

        <div className="text-center text-xs text-muted-foreground font-mono select-none">
          {isOffline ? "[SIGNAL LOST]" : "[LIVE STREAM FEED]"}
        </div>

        <div className="flex items-center justify-between text-[11px] text-zinc-400 z-10 font-mono bg-black/40 px-2 py-0.5 rounded">
          <span>{location || zone || "Monitored Zone"}</span>
          <span>
            {fps ? `${fps} FPS` : ""}
            {res ? ` • ${res.split(" ")[0]}` : ""}
          </span>
        </div>
      </div>

      {/* Info and controls */}
      {variant === "detailed" ? (
        <CardContent className="p-3.5 space-y-2.5">
          <div>
            <div className="text-xs font-semibold text-foreground">{name}</div>
            {zone && <div className="text-[11px] text-muted-foreground">{zone}</div>}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border text-[11px]">
            <span className="font-mono text-muted-foreground">{ip ?? "192.168.1.xxx"}</span>
            <div className="flex items-center gap-2">
              <Link
                href={historyHref}
                className={buttonVariants({ variant: "ghost", size: "xs" })}
              >
                {actionLabel === "History" ? "Footage" : actionLabel}
              </Link>
              <Button variant="outline" size="xs">
                PTZ
              </Button>
            </div>
          </div>
        </CardContent>
      ) : (
        <CardContent className="p-3 flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-foreground truncate">{name}</span>
          <Link
            href={historyHref}
            className={buttonVariants({ variant: "ghost", size: "xs" })}
          >
            {actionLabel}
          </Link>
        </CardContent>
      )}
    </Card>
  );
}
