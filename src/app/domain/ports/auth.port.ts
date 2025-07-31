import { InjectionToken } from "@angular/core";

/**
 * Interface that defines the contract for authentication-related operations.
 * Implementations of this port should provide login, logout, registration,
 * password reset, and authentication status functionality.
 * 
 * @author Elian.Diaz
 */
export interface AuthPort {
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
  register(email: string, password: string): Promise<void>;
  resetPassword(email: string): Promise<void>;
  isAuthenticated(): Promise<boolean>;
}

export const AUTH_PORT = new InjectionToken<AuthPort>('AuthPort');
