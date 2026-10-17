"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  IconAlertCircle,
  IconCheck,
  IconEye,
  IconEyeOff,
  IconKey,
  IconLock,
  IconLogout,
  IconMail,
  IconRefresh,
  IconServer,
  IconShield,
  IconShieldCheck,
  IconUser,
  IconUserCircle,
} from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiClient } from "@/lib/axios";
import {
  fetchCurrentUser,
  getStoredUser,
  logoutUser,
  parseApiError,
  updateUserProfile,
} from "@/lib/auth";
import {
  passwordChangeSchema,
  profileSchema,
  type PasswordChangeFormValues,
  type ProfileFormValues,
  type UserOut,
} from "@/schema";

const ROLE_LABELS: Record<string, { label: string; badge: string; desc: string }> = {
  cso: {
    label: "Chief Security Officer",
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    desc: "Full administrative authority over campus surveillance, user management, and security thresholds.",
  },
  officer: {
    label: "Investigation Officer",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    desc: "Access to forensic footage review, incident investigation, and anomaly report generation.",
  },
  guard: {
    label: "Security Guard",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    desc: "Real-time camera feed monitoring and immediate on-site alert response.",
  },
};

export default function SettingsPage() {
  const [user, setUser] = React.useState<UserOut | null>(null);
  const [isLoadingUser, setIsLoadingUser] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  // Backend test connection state
  const [apiPingStatus, setApiPingStatus] = React.useState<{
    tested: boolean;
    success: boolean;
    message: string;
    pingMs?: number;
  }>({
    tested: false,
    success: false,
    message: "",
  });
  const [isTestingApi, setIsTestingApi] = React.useState(false);

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  // Profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  // Password form
  const passwordForm = useForm<PasswordChangeFormValues>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  // Load user data on mount
  const loadUser = React.useCallback(async (forceRefresh = false) => {
    if (forceRefresh) {
      setIsRefreshing(true);
    } else {
      const cached = getStoredUser();
      if (cached) {
        setUser(cached);
        profileForm.reset({
          name: cached.name,
          email: cached.email,
        });
        setIsLoadingUser(false);
      }
    }

    try {
      const profile = await fetchCurrentUser();
      setUser(profile);
      profileForm.reset({
        name: profile.name,
        email: profile.email,
      });
    } catch {
      // If fetching fails but we have cached user, maintain cached
    } finally {
      setIsLoadingUser(false);
      setIsRefreshing(false);
    }
  }, [profileForm]);

  React.useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Handle Profile Update
  async function onProfileSubmit(values: ProfileFormValues) {
    try {
      profileForm.clearErrors("root");
      const updated = await updateUserProfile({
        name: values.name,
        email: values.email,
      });

      setUser(updated);
      toast.success("Profile updated", {
        description: "Your account details have been successfully saved.",
      });
    } catch (err: unknown) {
      const msg = parseApiError(err);
      profileForm.setError("root", { message: msg });
      toast.error("Failed to update profile", { description: msg });
    }
  }

  // Handle Password Update
  async function onPasswordSubmit(values: PasswordChangeFormValues) {
    try {
      passwordForm.clearErrors("root");
      await updateUserProfile({
        current_password: values.current_password,
        new_password: values.new_password,
      });

      passwordForm.reset({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });

      toast.success("Password updated", {
        description: "Your security credentials have been updated successfully.",
      });
    } catch (err: unknown) {
      const msg = parseApiError(err);
      passwordForm.setError("root", { message: msg });
      toast.error("Failed to change password", { description: msg });
    }
  }

  // Live API Connection Test
  async function testBackendConnection() {
    setIsTestingApi(true);
    const startTime = performance.now();
    try {
      const response = await apiClient.get("/");
      const elapsed = Math.round(performance.now() - startTime);
      setApiPingStatus({
        tested: true,
        success: true,
        pingMs: elapsed,
        message: response.data?.status || "ICSAMS API Handshake Successful",
      });
      toast.success("Backend connection verified", {
        description: `API responds with status 200 OK (${elapsed}ms latency).`,
      });
    } catch (err: unknown) {
      const msg = parseApiError(err);
      setApiPingStatus({
        tested: true,
        success: false,
        message: msg,
      });
      toast.error("Connection failed", {
        description: msg,
      });
    } finally {
      setIsTestingApi(false);
    }
  }

  const roleMeta = user ? ROLE_LABELS[user.role] || ROLE_LABELS.guard : ROLE_LABELS.guard;

  const initials = (user?.name || "User")
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground font-heading">
          Settings & Preferences
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your ICSAMS security operator account, credentials, and system parameters.
        </p>
      </div>

      <Tabs defaultValue="account" className="w-full gap-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-auto h-auto p-1 gap-1">
          <TabsTrigger value="account" className="gap-2 py-2">
            <IconUserCircle className="size-4" />
            <span>Account Profile</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2 py-2">
            <IconKey className="size-4" />
            <span>Security & Auth</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="gap-2 py-2">
            <IconServer className="size-4" />
            <span>Inference Backend</span>
          </TabsTrigger>
          <TabsTrigger value="dispatch" className="gap-2 py-2">
            <IconShield className="size-4" />
            <span>Dispatch & Policies</span>
          </TabsTrigger>
        </TabsList>

        {/* ── TAB 1: ACCOUNT PROFILE ────────────────────────── */}
        <TabsContent value="account" className="space-y-6 pt-2">
          {/* Identity Overview Banner */}
          <Card className="border-border/60 bg-muted/15">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="size-16 rounded-xl border-2 border-primary/20">
                    <AvatarImage src="/avatars/admin.jpg" alt={user?.name || "Operator"} />
                    <AvatarFallback className="rounded-xl text-lg font-bold bg-primary/10 text-primary">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-semibold text-foreground">
                        {user?.name || (isLoadingUser ? "Loading..." : "Security Operator")}
                      </h2>
                      <Badge variant="outline" className={roleMeta.badge}>
                        <IconShieldCheck className="size-3 mr-1" />
                        {roleMeta.label}
                      </Badge>
                      <Badge variant="secondary" className="gap-1.5 text-emerald-500 bg-emerald-500/10 border-emerald-500/20">
                        <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Active
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <IconMail className="size-3.5" />
                      {user?.email || "operator@icsams.internal"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => loadUser(true)}
                    disabled={isRefreshing}
                    className="gap-1.5 text-xs w-full sm:w-auto"
                  >
                    <IconRefresh className={`size-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
                    Sync Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details Edit Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Account Information</CardTitle>
              <CardDescription>
                Update your official identity details registered on the security network.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id="profile-form" onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
                {profileForm.formState.errors.root?.message && (
                  <div className="mb-4 flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
                    <IconAlertCircle className="size-4 shrink-0 mt-0.5" />
                    <span>{profileForm.formState.errors.root.message}</span>
                  </div>
                )}

                <FieldGroup>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Controller
                      name="name"
                      control={profileForm.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="profile-name">Full Name</FieldLabel>
                          <div className="relative">
                            <Input
                              {...field}
                              id="profile-name"
                              placeholder="e.g. Chief Security Officer"
                              disabled={profileForm.formState.isSubmitting}
                              className="pl-9"
                            />
                            <IconUser className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                          </div>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="email"
                      control={profileForm.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="profile-email">Official Email</FieldLabel>
                          <div className="relative">
                            <Input
                              {...field}
                              id="profile-email"
                              type="email"
                              placeholder="operator@example.com"
                              disabled={profileForm.formState.isSubmitting}
                              className="pl-9"
                            />
                            <IconMail className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                          </div>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1.5">
                      <label className="text-xs text-muted-foreground font-medium">Assigned Role</label>
                      <Input
                        value={roleMeta.label}
                        disabled
                        className="bg-muted/40 cursor-not-allowed font-medium text-xs"
                      />
                      <p className="text-[11px] text-muted-foreground">
                        Role permissions are governed by central security administration.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-muted-foreground font-medium">Operator ID</label>
                      <Input
                        value={user ? `USR-${String(user.id).padStart(4, "0")}` : "USR-0001"}
                        disabled
                        className="bg-muted/40 cursor-not-allowed font-mono text-xs"
                      />
                      <p className="text-[11px] text-muted-foreground">
                        Permanent identifier used in audit logs and emergency action registers.
                      </p>
                    </div>
                  </div>
                </FieldGroup>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-border/50 pt-4">
              <span className="text-xs text-muted-foreground">
                Changes to official email require a re-authentication handshake.
              </span>
              <Button
                type="submit"
                form="profile-form"
                size="sm"
                disabled={profileForm.formState.isSubmitting || !profileForm.formState.isDirty}
              >
                {profileForm.formState.isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Spinner className="size-3.5" />
                    <span>Saving Changes...</span>
                  </span>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardFooter>
          </Card>

          {/* Role Privileges Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Security Clearance & Permissions</CardTitle>
              <CardDescription>
                System capabilities assigned to your current clearance level ({roleMeta.label})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border bg-muted/20 p-4 space-y-3">
                <p className="text-xs text-foreground font-medium">{roleMeta.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <IconCheck className="size-4 text-emerald-500 shrink-0" />
                    <span>Live RTSP & HLS Video Streaming</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <IconCheck className="size-4 text-emerald-500 shrink-0" />
                    <span>Real-time Anomaly Event Alert Feed</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <IconCheck className="size-4 text-emerald-500 shrink-0" />
                    <span>Incident Acknowledgment & Escalation</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <IconCheck className="size-4 text-emerald-500 shrink-0" />
                    <span>Audit Report Generation & Export</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── TAB 2: SECURITY & AUTH ────────────────────────── */}
        <TabsContent value="security" className="space-y-6 pt-2">
          {/* Change Password Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Change Security Password</CardTitle>
              <CardDescription>
                Ensure your credentials meet campus compliance standards (min. 6 characters).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id="password-form" onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
                {passwordForm.formState.errors.root?.message && (
                  <div className="mb-4 flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
                    <IconAlertCircle className="size-4 shrink-0 mt-0.5" />
                    <span>{passwordForm.formState.errors.root.message}</span>
                  </div>
                )}

                <FieldGroup>
                  <Controller
                    name="current_password"
                    control={passwordForm.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="current-pw">Current Password</FieldLabel>
                        <div className="relative">
                          <Input
                            {...field}
                            id="current-pw"
                            type={showCurrentPassword ? "text" : "password"}
                            placeholder="Enter current password"
                            disabled={passwordForm.formState.isSubmitting}
                            className="pl-9 pr-9"
                          />
                          <IconLock className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                          <button
                            type="button"
                            tabIndex={-1}
                            onClick={() => setShowCurrentPassword((prev) => !prev)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showCurrentPassword ? <IconEyeOff className="size-4" /> : <IconEye className="size-4" />}
                          </button>
                        </div>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Controller
                      name="new_password"
                      control={passwordForm.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="new-pw">New Password</FieldLabel>
                          <div className="relative">
                            <Input
                              {...field}
                              id="new-pw"
                              type={showNewPassword ? "text" : "password"}
                              placeholder="Minimum 6 characters"
                              disabled={passwordForm.formState.isSubmitting}
                              className="pl-9 pr-9"
                            />
                            <IconKey className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                            <button
                              type="button"
                              tabIndex={-1}
                              onClick={() => setShowNewPassword((prev) => !prev)}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showNewPassword ? <IconEyeOff className="size-4" /> : <IconEye className="size-4" />}
                            </button>
                          </div>
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />

                    <Controller
                      name="confirm_password"
                      control={passwordForm.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="confirm-pw">Confirm New Password</FieldLabel>
                          <div className="relative">
                            <Input
                              {...field}
                              id="confirm-pw"
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Re-type new password"
                              disabled={passwordForm.formState.isSubmitting}
                              className="pl-9 pr-9"
                            />
                            <IconKey className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                            <button
                              type="button"
                              tabIndex={-1}
                              onClick={() => setShowConfirmPassword((prev) => !prev)}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showConfirmPassword ? <IconEyeOff className="size-4" /> : <IconEye className="size-4" />}
                            </button>
                          </div>
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                  </div>
                </FieldGroup>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end border-t border-border/50 pt-4">
              <Button
                type="submit"
                form="password-form"
                size="sm"
                disabled={passwordForm.formState.isSubmitting}
              >
                {passwordForm.formState.isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Spinner className="size-3.5" />
                    <span>Updating Password...</span>
                  </span>
                ) : (
                  "Update Password"
                )}
              </Button>
            </CardFooter>
          </Card>

          {/* Active Session & Logout Card */}
          <Card className="border-destructive/30 bg-destructive/5">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                <IconLogout className="size-4 text-destructive" />
                Session Management & Sign Out
              </CardTitle>
              <CardDescription>
                Terminate active JWT authentication tokens and safely exit the monitoring console.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg border border-border bg-background">
                <div>
                  <div className="text-xs font-semibold text-foreground">Current Operator Session</div>
                  <div className="text-[11px] text-muted-foreground">
                    Signed in via Bearer JWT with HMAC-SHA256 encrypted verification.
                  </div>
                </div>
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 bg-emerald-500/10 w-fit">
                  Session Valid
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center border-t border-destructive/20 pt-4">
              <span className="text-xs text-muted-foreground">
                Signing out will clear all local credentials and redirect to login.
              </span>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  toast.success("Signing out...", {
                    description: "Terminating operator session.",
                  });
                  logoutUser("/auth/login");
                }}
                className="gap-2"
              >
                <IconLogout className="size-4" />
                Sign Out from Console
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* ── TAB 3: INFERENCE BACKEND ───────────────────────── */}
        <TabsContent value="system" className="space-y-6 pt-2">
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
                    defaultValue={process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}
                    className="font-mono text-xs"
                    readOnly
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-muted-foreground font-medium">ML Pipeline WebSocket Stream</label>
                  <Input
                    type="text"
                    defaultValue="ws://localhost:8000/ws"
                    className="font-mono text-xs"
                    readOnly
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-border text-xs">
                <div className="flex items-center gap-2">
                  {apiPingStatus.tested ? (
                    apiPingStatus.success ? (
                      <Badge variant="secondary" className="gap-1.5 text-emerald-500 bg-emerald-500/10">
                        <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                        Handshake OK (Ping: {apiPingStatus.pingMs}ms) — {apiPingStatus.message}
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="gap-1.5">
                        <IconAlertCircle className="size-3" />
                        Handshake Failed: {apiPingStatus.message}
                      </Badge>
                    )
                  ) : (
                    <Badge variant="outline" className="gap-1.5 text-muted-foreground">
                      <span className="size-2 rounded-full bg-muted-foreground" />
                      Handshake Not Tested
                    </Badge>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={testBackendConnection}
                  disabled={isTestingApi}
                  className="gap-2"
                >
                  {isTestingApi ? <Spinner className="size-3.5" /> : <IconServer className="size-3.5" />}
                  Test Connection
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Footage Storage & Retention */}
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
        </TabsContent>

        {/* ── TAB 4: DISPATCH & POLICIES ─────────────────────── */}
        <TabsContent value="dispatch" className="space-y-6 pt-2">
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
            <CardFooter className="flex justify-end pt-4 border-t border-border">
              <Button size="sm" onClick={() => toast.success("Dispatch policies saved")}>
                Save Dispatch Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
