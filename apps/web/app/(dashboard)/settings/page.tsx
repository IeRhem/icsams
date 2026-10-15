export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">System Settings</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Configure API backend connections, emergency webhooks, and retention parameters.
        </p>
      </div>

      {/* Backend API Connection */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-white">FastAPI & Inference Backend</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-zinc-400">API Gateway Endpoint</label>
            <input
              type="text"
              defaultValue="http://127.0.0.1:8000/api/v1"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 font-mono focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-zinc-400">ML Pipeline WebSocket Stream</label>
            <input
              type="text"
              defaultValue="ws://127.0.0.1:8000/ws/detections"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 font-mono focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-emerald-400 font-medium">Gateway Handshake OK (Ping: 4ms)</span>
          </div>
          <button className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium transition-colors">
            Test Connection
          </button>
        </div>
      </div>

      {/* Alert Notifications */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-white">Alert Dispatch & Webhooks</h2>
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-950 border border-zinc-800">
            <div>
              <div className="font-medium text-white">Push Notifications to Mobile Guards</div>
              <div className="text-zinc-500">Send instant priority alerts when critical intrusions occur</div>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-600 rounded" />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-950 border border-zinc-800">
            <div>
              <div className="font-medium text-white">Email Digest Dispatch</div>
              <div className="text-zinc-500">Forward hourly security digests to on-duty supervisors</div>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-600 rounded" />
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-zinc-400">Security Incident Webhook (Slack / Discord / PagerDuty)</label>
            <input
              type="text"
              placeholder="https://hooks.slack.com/services/..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 font-mono focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Storage and Retention */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-white">Footage Storage & Retention Policy</h2>
        <div className="space-y-3 text-xs">
          <div className="flex justify-between text-zinc-400">
            <span>Primary NVR Storage (NAS-01)</span>
            <span className="text-white font-mono">4.8 TB / 16.0 TB (30% used)</span>
          </div>
          <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: "30%" }}></div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <div>
              <div className="font-medium text-white">Retention Period</div>
              <div className="text-zinc-500">Automatically prune recordings older than selected period</div>
            </div>
            <select className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-200">
              <option>30 Days</option>
              <option>60 Days</option>
              <option>90 Days</option>
              <option>180 Days</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 font-medium transition-colors">
          Reset Defaults
        </button>
        <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs text-white font-semibold shadow-sm transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  );
}
