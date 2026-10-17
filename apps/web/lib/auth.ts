import axios from "axios";
import { apiClient } from "./axios";
import type {
  LoginFormValues,
  TokenResponse,
  UserOut,
  AuthSession,
  ApiErrorResponse,
  UserUpdatePayload,
} from "@/schema";

const TOKEN_KEY = "access_token";
const LEGACY_TOKEN_KEY = "token";
const USER_KEY = "user";
const ROLE_KEY = "user_role";

function setCookie(name: string, value: string, days = 7) {
  if (typeof document === "undefined") return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function removeCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return (
    localStorage.getItem(TOKEN_KEY) ||
    localStorage.getItem(LEGACY_TOKEN_KEY) ||
    null
  );
}

export function getStoredUser(): UserOut | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserOut;
  } catch {
    return null;
  }
}

export function setStoredUser(user: UserOut): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(ROLE_KEY, user.role);
  window.dispatchEvent(new Event("user-profile-updated"));
}

export function setAuthSession(tokenData: TokenResponse, user?: UserOut): void {
  if (typeof window === "undefined") return;

  const { access_token, role } = tokenData;

  // LocalStorage
  localStorage.setItem(TOKEN_KEY, access_token);
  localStorage.setItem(LEGACY_TOKEN_KEY, access_token);
  if (role) {
    localStorage.setItem(ROLE_KEY, role);
  }

  // SessionStorage
  sessionStorage.setItem(TOKEN_KEY, access_token);
  sessionStorage.setItem(LEGACY_TOKEN_KEY, access_token);

  // Cookies (accessible by middleware / SSR)
  setCookie(TOKEN_KEY, access_token);
  setCookie(LEGACY_TOKEN_KEY, access_token);
  setCookie("auth_token", access_token);

  if (user) {
    setStoredUser(user);
  }
}

export function clearAuthSession(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(LEGACY_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(ROLE_KEY);

  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(LEGACY_TOKEN_KEY);

  removeCookie(TOKEN_KEY);
  removeCookie(LEGACY_TOKEN_KEY);
  removeCookie("auth_token");

  window.dispatchEvent(new Event("user-logged-out"));
}

export function logoutUser(redirectPath = "/auth/login"): void {
  clearAuthSession();
  if (typeof window !== "undefined") {
    window.location.href = redirectPath;
  }
}

export function isAuthenticated(): boolean {
  return Boolean(getStoredToken());
}

export async function fetchCurrentUser(): Promise<UserOut> {
  const response = await apiClient.get<UserOut>("/auth/me");
  return response.data;
}

export async function refreshCurrentUser(): Promise<UserOut> {
  const user = await fetchCurrentUser();
  setStoredUser(user);
  return user;
}

export async function updateUserProfile(
  payload: UserUpdatePayload
): Promise<UserOut> {
  const response = await apiClient.patch<UserOut>("/auth/me", payload);
  const updatedUser = response.data;
  setStoredUser(updatedUser);
  return updatedUser;
}

export async function loginWithApi(data: LoginFormValues): Promise<AuthSession> {
  const tokenResponse = await apiClient.post<TokenResponse>("/auth/login", {
    email: data.email,
    password: data.password,
  });

  const tokenData = tokenResponse.data;

  // Temporarily store token so subsequent apiClient request uses it
  setAuthSession(tokenData);

  let userProfile: UserOut;
  try {
    userProfile = await fetchCurrentUser();
  } catch (error) {
    clearAuthSession();
    throw error;
  }

  // Store final session with user details
  setAuthSession(tokenData, userProfile);

  return {
    token: tokenData,
    user: userProfile,
  };
}

export function parseApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const errorData = error.response?.data as ApiErrorResponse | undefined;

    if (errorData?.detail) {
      if (typeof errorData.detail === "string") {
        return errorData.detail;
      }
      if (Array.isArray(errorData.detail) && errorData.detail.length > 0) {
        return errorData.detail.map((item) => item.msg || "Validation error").join(", ");
      }
    }

    if (error.response?.status === 401) {
      return "Incorrect email or password. Please try again.";
    }

    if (error.response?.status === 403) {
      return "This account is deactivated. Please contact your administrator.";
    }

    if (error.response?.status === 404) {
      return "Authentication endpoint not found. Please verify API configuration.";
    }

    if (error.code === "ECONNABORTED") {
      return "The connection timed out. Please verify your connection to the API server.";
    }

    if (error.code === "ERR_NETWORK" || !error.response) {
      return "Unable to connect to the ICSAMS API server. Please ensure the backend is running.";
    }

    return error.message || "An unexpected error occurred during login.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred. Please try again.";
}
