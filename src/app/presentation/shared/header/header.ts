import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { onAuthStateChanged, signOut } from 'firebase/auth';

/**
 * HeaderComponent handles the top navigation bar of the app,
 * including authentication state, login, and logout actions.
 * 
 * Displays login or logout options based on the user's authentication state.
 * 
 * @author Elian
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent implements OnInit {
  private auth = inject(Auth);
  private router = inject(Router);

  isLoggedIn = false;

  /**
   * Subscribes to authentication state changes on component initialization.
   */
  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      this.isLoggedIn = !!user;
    });
  }

  /**
   * Navigates to the login page.
   */
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  /**
   * Signs the user out and redirects to the login page.
   */
  logout(): void {
    signOut(this.auth).then(() => {
      this.router.navigate(['/login']);
    });
  }
}
