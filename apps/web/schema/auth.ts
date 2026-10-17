import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(1, { message: "Password is required." })
    .min(6, { message: "Password must be at least 6 characters." }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const profileSchema = z.object({
  name: z.string().min(1, { message: "Full name is required." }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email address." }),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const passwordChangeSchema = z
  .object({
    current_password: z
      .string()
      .min(1, { message: "Current password is required." }),
    new_password: z
      .string()
      .min(6, { message: "New password must be at least 6 characters." }),
    confirm_password: z
      .string()
      .min(1, { message: "Please confirm your new password." }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "New passwords do not match.",
    path: ["confirm_password"],
  });

export type PasswordChangeFormValues = z.infer<typeof passwordChangeSchema>;

export type UserRole = "guard" | "officer" | "cso";

export interface TokenResponse {
  access_token: string;
  token_type: string;
  role: UserRole;
}

export interface UserOut {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
}

export interface UserUpdatePayload {
  name?: string;
  email?: string;
  current_password?: string;
  new_password?: string;
}

export interface AuthSession {
  token: TokenResponse;
  user: UserOut;
}

export interface ApiErrorDetail {
  loc?: (string | number)[];
  msg?: string;
  type?: string;
}

export interface ApiErrorResponse {
  detail?: string | ApiErrorDetail[];
}
