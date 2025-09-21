import api from "@/lib/axios";
import type { User } from "@/types/auth";
import type { ApiResponse } from "@/types/api";

export const AuthService = {
  // Login
  login: async (
    data: { email: string; password: string }
  ): Promise<ApiResponse<{ id: string; email: string; role: string; token: string }>> => {
    try {
      const res = await api.post<
        ApiResponse<{ id: string; email: string; role: string; token: string }>
      >("/auth/login", data);

      if (res.data.success && res.data.data?.token) {
        localStorage.setItem("token", res.data.data.token);
      }

      return res.data;
    } catch (err: any) {
      return {
        success: false,
        message: err.response?.data?.message || "login-failed",
      } as ApiResponse<any>;
    }
  },

  // Register
  register: async (
    data: {name: string; email: string; password: string; role?: string }
  ): Promise<ApiResponse<{ id: string; email: string; role: string; token?: string }>> => {
    try {
      const res = await api.post<
        ApiResponse<{ id: string; email: string; role: string; token?: string }>
      >("/auth/register", data);

      return res.data;
    } catch (err: any) {
      return {
        success: false,
        message: err.response?.data?.message || "register-failed",
      } as ApiResponse<any>;
    }
  },

  // Change password
  changePassword: async (
    data: { oldPassword: string; newPassword: string }
  ): Promise<ApiResponse<{ message: string }>> => {
    try {
      const res = await api.post<ApiResponse<{ message: string }>>(
        "/auth/change-password",
        data
      );
      return res.data;
    } catch (err: any) {
      return {
        success: false,
        message: err.response?.data?.message || "change-password-failed",
      } as ApiResponse<any>;
    }
  },

  // Forgot password
  forgotPassword: async (
    data: { email: string }
  ): Promise<ApiResponse<{ message: string }>> => {
    try {
      const res = await api.post<ApiResponse<{ message: string }>>(
        "/auth/forgot-password",
        data
      );
      return res.data;
    } catch (err: any) {
      return {
        success: false,
        message: err.response?.data?.message || "forgot-password-failed",
      } as ApiResponse<any>;
    }
  },
  
  // Verify email
verifyEmail: async (
  token: string
): Promise<ApiResponse<{ message: string }>> => {
  try {
    const res = await api.post<ApiResponse<{ message: string }>>(
      "/auth/verify-email",
      { token }
    );
    return res.data;
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data?.message || "verify-email-failed",
    } as ApiResponse<any>;
  }
},

  // Me (profile)
  me: async (): Promise<ApiResponse<User>> => {
    try {
      const res = await api.get<ApiResponse<User>>("/auth/me");
      return res.data;
    } catch (err: any) {
      return {
        success: false,
        message: err.response?.data?.message || "fetch-user-failed",
      } as ApiResponse<User>;
    }
  },
};
