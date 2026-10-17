"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          System Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configure API backend connections, emergency webhooks, and retention parameters.
        </p>
      </div>

      {/* Backend API Connection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">FastAPI & Inference Backend</CardTitle>
          <CardDescription>Network endpoints for computer vision services and telemetry</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-muted-foreground font-medium">API Gateway Endpoint</label>
              <Input
                type="text"
                defaultValue="http://127.0.0.1:8000/api/v1"
                className="font-mono text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-muted-foreground font-medium">ML Pipeline WebSocket Stream</label>
              <Input
                type="text"
                defaultValue="ws://127.0.0.1:8000/ws/detections"
                className="font-mono text-xs"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border text-xs">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1.5 text-emerald-500">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                Gateway Handshake OK (Ping: 4ms)
              </Badge>
            </div>
            <Button variant="outline" size="sm">
              Test Connection
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Alert Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Alert Dispatch & Webhooks</CardTitle>
          <CardDescription>Notification triggers and incident webhook integrations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20">
              <div>
                <div className="font-medium text-foreground">Push Notifications to Mobile Guards</div>
                <div className="text-muted-foreground text-[11px]">Send instant priority alerts when critical intrusions occur</div>
              </div>
              <Checkbox defaultChecked />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20">
              <div>
                <div className="font-medium text-foreground">Email Digest Dispatch</div>
                <div className="text-muted-foreground text-[11px]">Forward hourly security digests to on-duty supervisors</div>
              </div>
              <Checkbox defaultChecked />
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-muted-foreground font-medium">Security Incident Webhook (Slack / Discord / PagerDuty)</label>
              <Input
                type="text"
                placeholder="https://hooks.slack.com/services/..."
                className="font-mono text-xs"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Storage and Retention */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Footage Storage & Retention Policy</CardTitle>
          <CardDescription>Capacity allocations and automatic pruning parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-muted-foreground">
              <span>Primary NVR Storage (NAS-01)</span>
              <span className="text-foreground font-mono font-medium">4.8 TB / 16.0 TB (30% used)</span>
            </div>
            <div className="w-full bg-muted h-2.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full transition-all" style={{ width: "30%" }}></div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <div>
                <div className="font-medium text-foreground">Retention Period</div>
                <div className="text-muted-foreground text-[11px]">Automatically prune recordings older than selected period</div>
              </div>
              <select className="bg-input/30 border border-input rounded-md px-3 py-1.5 text-xs text-foreground outline-none focus:border-ring">
                <option>30 Days</option>
                <option>60 Days</option>
                <option>90 Days</option>
                <option>180 Days</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="outline" size="sm">
          Reset Defaults
        </Button>
        <Button size="sm">
          Save Settings
        </Button>
      </div>
    </div>
  );
}
