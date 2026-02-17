import type { components } from "@/common";
import { socketClient } from "./socket-client";
import { apiClient, unwrapResponse } from "./api-client";

type UserResponseDto = components["schemas"]["UserResponseDto"];

/**
 * Authentication service that orchestrates REST auth + WebSocket connection
 */
export class AuthService {
  private currentUser: UserResponseDto | null = null;

  // Callbacks for state changes
  public onAuthStateChanged: (user: UserResponseDto | null) => void = () => {};

  /**
   * Register a new user
   * 1. Calls REST /auth/register to get JWT cookie
   * 2. Fetches WS token
   * 3. Connects WebSocket with WS token
   */
  async register(email: string, name: string, password: string): Promise<UserResponseDto> {
    try {
      // Step 1: Register via REST (sets JWT cookie)
      await unwrapResponse(
        apiClient.POST("/api/auth/register", {
          body: { email, name, password },
        }),
      );

      // Step 2: Get user profile
      const user = await unwrapResponse(apiClient.GET("/api/auth/me"));
      this.currentUser = user;

      // Step 3: Connect WebSocket
      await this.connectWebSocket();

      this.onAuthStateChanged(user);
      return user;
    } catch (error) {
      this.currentUser = null;
      this.onAuthStateChanged(null);
      throw error;
    }
  }

  /**
   * Login with email and password
   * 1. Calls REST /auth/login to get JWT cookie
   * 2. Fetches WS token
   * 3. Connects WebSocket with WS token
   */
  async login(email: string, password: string): Promise<UserResponseDto> {
    try {
      // Step 1: Login or Register via REST (sets JWT cookie)
      await unwrapResponse(
        apiClient.POST("/api/auth/login", {
          body: { email, password },
        }),
      );

      // Step 2: Get user profile
      const user = await unwrapResponse(apiClient.GET("/api/auth/me"));
      this.currentUser = user;

      // Step 3: Connect WebSocket
      await this.connectWebSocket();

      this.onAuthStateChanged(user);
      return user;
    } catch (error) {
      this.currentUser = null;
      this.onAuthStateChanged(null);
      throw error;
    }
  }

  async loginOrRegister(email: string, password: string): Promise<UserResponseDto> {
    try {
      // Step 1: Login or Register via REST (sets JWT cookie)
      await unwrapResponse(
        apiClient.POST("/api/auth/login-or-register", {
          body: { email, password },
        }),
      );

      // Step 2: Get user profile
      const user = await unwrapResponse(apiClient.GET("/api/auth/me"));
      this.currentUser = user;

      // Step 3: Connect WebSocket
      await this.connectWebSocket();

      this.onAuthStateChanged(user);
      return user;
    } catch (error) {
      this.currentUser = null;
      this.onAuthStateChanged(null);
      throw error;
    }
  }

  /**
   * Logout user
   * 1. Disconnects WebSocket
   * 2. Calls REST /auth/logout to clear JWT cookie
   */
  async logout(): Promise<void> {
    try {
      // Disconnect WebSocket first
      socketClient.disconnect();

      // Clear JWT cookie on server
      await unwrapResponse(apiClient.POST("/api/auth/logout"));

      this.currentUser = null;
      this.onAuthStateChanged(null);
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear local state even if server call fails
      this.currentUser = null;
      this.onAuthStateChanged(null);
    }
  }

  /**
   * Get current user (cached)
   */
  getCurrentUser(): UserResponseDto | null {
    return this.currentUser;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  /**
   * Refresh WS token and reconnect
   * Called when WebSocket connection is lost or token expires
   */
  async refreshWsToken(): Promise<void> {
    try {
      const wsTokenResponse = await unwrapResponse(apiClient.GET("/api/auth/ws-token"));

      if (socketClient) {
        socketClient.connect(wsTokenResponse.token);
      } else {
        await this.connectWebSocket();
      }
    } catch (error) {
      // If we can't get a new token, JWT might be expired
      if (error instanceof Error && error.message.includes("401")) {
        // JWT expired, user needs to login again
        this.currentUser = null;
        this.onAuthStateChanged(null);
        throw new Error("Session expired. Please login again.");
      }
      throw error;
    }
  }

  /**
   * Try to restore session from existing JWT cookie
   * Called on app startup or page refresh
   */
  async restoreSession(): Promise<boolean> {
    try {
      // Try to get current user (will fail if JWT cookie is invalid/expired)
      const user = await unwrapResponse(apiClient.GET("/api/auth/me"));
      this.currentUser = user;

      // Connect WebSocket
      await this.connectWebSocket();

      this.onAuthStateChanged(user);
      return true;
    } catch {
      // No valid session
      this.currentUser = null;
      this.onAuthStateChanged(null);
      return false;
    }
  }

  /**
   * Internal: Connect WebSocket with WS token
   */
  private async connectWebSocket(): Promise<void> {
    // Get WS token
    const wsTokenResponse = await unwrapResponse(apiClient.GET("/api/auth/ws-token"));

    // Create or reconnect
    socketClient.connect(wsTokenResponse.token);
  }
}

// Create singleton instance
export const authService = new AuthService();
