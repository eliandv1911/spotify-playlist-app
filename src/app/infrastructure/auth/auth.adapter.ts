import { Injectable, inject } from '@angular/core';
import { AuthPort } from '../../domain/ports/auth.port';
import { Auth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail } from '@angular/fire/auth';

/**
 * Adapter class that implements AuthPort to integrate Firebase Authentication 
 * with the application using the dependency inversion principle.
 * 
 * @author Elian.Diaz
 */
@Injectable()
export class FirebaseAuthAdapter implements AuthPort {
  private auth = inject(Auth);

  /**
   * Authenticates the user with the provided email and password using Firebase.
   */
  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * Logs the user out from the current Firebase session.
   */
  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  /**
   * Creates a new user account with the provided email and password using Firebase.
   * After registration, the user is automatically logged out.
   */
  async register(email: string, password: string): Promise<void> {
    await createUserWithEmailAndPassword(this.auth, email, password);
    await signOut(this.auth);
  }

  /**
   * Sends a password reset email to the provided address via Firebase.
   */
  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(this.auth, email);
  }

  /**
   * Checks whether a user is currently authenticated with Firebase.
   */
  async isAuthenticated(): Promise<boolean> {
    return new Promise(resolve => {
      const unsub = this.auth.onAuthStateChanged(user => {
        unsub();
        resolve(!!user);
      });
    });
  }
}
