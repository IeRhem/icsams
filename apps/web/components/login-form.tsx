"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import {
  IconAlertCircle,
  IconEye,
  IconEyeOff,
  IconLock,
  IconMail,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import { loginSchema, type LoginFormValues } from "@/schema"
import { loginWithApi, parseApiError } from "@/lib/auth"

function getSafeRedirectUrl(target: string | null | undefined): string {
  if (!target || typeof target !== "string") return "/"
  try {
    const decoded = decodeURIComponent(target).trim()
    if (!decoded) return "/"

    // Preserve rejection of protocol-relative and backslash-prefixed redirects
    if (
      decoded.startsWith("//") ||
      decoded.startsWith("/\\") ||
      decoded.startsWith("\\")
    ) {
      return "/"
    }

    const currentOrigin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "http://localhost:3000"

    const parsed = new URL(decoded, currentOrigin)

    // Accept only when resolved origin matches the current origin
    if (parsed.origin !== currentOrigin) {
      return "/"
    }

    const normalizedPath = parsed.pathname + parsed.search + parsed.hash
    if (
      !normalizedPath.startsWith("/") ||
      normalizedPath.startsWith("//") ||
      normalizedPath.startsWith("/\\")
    ) {
      return "/"
    }

    return normalizedPath
  } catch {
    return "/"
  }
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = React.useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { isSubmitting } = form.formState
  const rootError = form.formState.errors.root?.message

  async function onSubmit(data: LoginFormValues) {
    try {
      form.clearErrors("root")
      const session = await loginWithApi(data)

      toast.success("Login successful", {
        description: `Welcome back, ${session.user.name || session.user.email}!`,
      })

      const targetUrl =
        searchParams?.get("callbackUrl") ||
        searchParams?.get("redirect")

      const callbackUrl = getSafeRedirectUrl(targetUrl)

      router.push(callbackUrl)
      router.refresh()
    } catch (err: unknown) {
      const message = parseApiError(err)
      form.setError("root", { message })
      toast.error("Login failed", {
        description: message,
      })
    }
  }

  return (
    <Card className={cn("w-full max-w-sm", className)} {...props}>
      <CardContent>
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {rootError && (
            <div
              role="alert"
              className="flex items-start gap-2.5 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive animate-in fade-in slide-in-from-top-1"
            >
              <IconAlertCircle className="size-4 shrink-0 mt-0.5" />
              <div className="flex-1 leading-snug">{rootError}</div>
            </div>
          )}

          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      placeholder="name@example.com"
                      autoComplete="email"
                      disabled={isSubmitting}
                      aria-invalid={fieldState.invalid}
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

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center">
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <a
                      href="#"
                      tabIndex={-1}
                      className="ml-auto inline-block text-xs text-muted-foreground underline-offset-4 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Input
                      {...field}
                      id={field.name}
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      disabled={isSubmitting}
                      aria-invalid={fieldState.invalid}
                      className="pl-9 pr-9"
                    />
                    <IconLock className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                      {showPassword ? (
                        <IconEyeOff className="size-4" />
                      ) : (
                        <IconEye className="size-4" />
                      )}
                    </button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button
          type="submit"
          form="login-form"
          className="w-full font-medium"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner className="size-4" />
              <span>Verifying credentials...</span>
            </span>
          ) : (
            "Sign In"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
