import { create } from "zustand";
import api from "@/lib/axios";
import { connectSocket, disconnectSocket } from "@/lib/socket";
import type {
  AuthResponse,
  LoginPayload,
  MessageResponse,
  RegisterPayload,
  User,
  VerifyEmailPayload,
} from "@/types/auth";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  register: (payload: RegisterPayload) => Promise<MessageResponse>;
  verifyEmail: (payload: VerifyEmailPayload) => Promise<MessageResponse>;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
  fetchMe: () => Promise<void>;
  setUser: (user: User | null) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  register: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post<MessageResponse>("/api/auth/register", payload);
      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Registration failed.";
      set({ error: message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  verifyEmail: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post<MessageResponse>("/api/auth/verify", payload);
      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Verification failed.";
      set({ error: message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post<AuthResponse>("/api/auth/login", payload);
      set({ user: data.user, isAuthenticated: true });
      connectSocket();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed.";
      set({ error: message, user: null, isAuthenticated: false });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await api.post<MessageResponse>("/api/auth/logout");
    } catch {
      // Clear local session even if logout request fails
    } finally {
      disconnectSocket();
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  fetchMe: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get<{ user: User }>("/api/auth/me");
      set({ user: data.user, isAuthenticated: true });
      connectSocket();
    } catch {
      disconnectSocket();
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },

  setUser: (user) => {
    set({ user, isAuthenticated: Boolean(user) });
    if (user) {
      connectSocket();
    } else {
      disconnectSocket();
    }
  },

  clearError: () => set({ error: null }),
}));
