import { Injectable, inject } from '@angular/core';
import { AUTH_PORT } from '../domain/ports/auth.port';
import type { AuthPort } from '../domain/ports/auth.port';

/**
 * Service class that acts as a bridge between components and the authentication port.
 * It delegates authentication operations to the injected AuthPort implementation.
 * 
 * @author Elian.Diaz
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authPort = inject<AuthPort>(AUTH_PORT);

  /**
   * Logs in a user using the provided email and password.
   * 
   * @param email - The user's email.
   * @param password - The user's password.
   * @returns A Promise that resolves when login is complete.
   */
  login(email: string, password: string) {
    return this.authPort.login(email, password);
  }

  /**
   * Logs out the currently authenticated user.
   * 
   * @returns A Promise that resolves when logout is complete.
   */
  logout() {
    return this.authPort.logout();
  }

  /**
   * Registers a new user with the provided email and password.
   * 
   * @param email - The user's email.
   * @param password - The desired password.
   * @returns A Promise that resolves when registration is complete.
   */
  register(email: string, password: string) {
    return this.authPort.register(email, password);
  }

  /**
   * Sends a password reset email to the specified address.
   * 
   * @param email - The email address to send the reset link to.
   * @returns A Promise that resolves when the email has been sent.
   */
  resetPassword(email: string) {
    return this.authPort.resetPassword(email);
  }

  /**
   * Checks if a user is currently authenticated.
   * 
   * @returns A Promise that resolves to `true` if authenticated, otherwise `false`.
   */
  isAuthenticated() {
    return this.authPort.isAuthenticated();
  }
}