import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../application/auth.service';

/**
 * LoginComponent handles user authentication.
 * It presents a login form with email and password fields,
 * and authenticates the user via the AuthService.
 * 
 * On successful login, it navigates to the search page;
 * on failure, it displays an error message.
 * 
 * @author Elian.Diaz
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  private authService = inject(AuthService);
  private router = inject(Router);
  error: boolean = false;

  /**
   * Initializes the login form with email and password fields,
   * applying required validation rules.
   * 
   * @param fb - FormBuilder used to create the reactive form.
   */
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /**
   * Submits the login form and attempts to authenticate the user.
   * On success, navigates to the search page.
   * On failure, sets an error flag to inform the user.
   */
  async login(): Promise<void> {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        await this.authService.login(email, password);
        await this.router.navigate(['/search']);
        this.error = false;
      } catch (err: any) {
        this.error = true;
      }
    } else {
      this.error = true;
    }
  }
}
