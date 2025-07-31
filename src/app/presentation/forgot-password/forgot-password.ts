import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../application/auth.service';

/**
 * ForgotPasswordComponent handles the password recovery flow.
 * It displays a form where users can enter their email to receive a password reset link.
 * On successful request, the user is redirected to the login page.
 * 
 * @author Elian.Diaz
 */
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss'
})
export class ForgotPasswordComponent {
  form: FormGroup;
  private authService = inject(AuthService);
  private router = inject(Router);
  success = false;
  error = false;

  /**
   * Initializes the form with a single email field and applies validation.
   * 
   * @param fb - FormBuilder used to construct the form group.
   */
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  /**
   * Submits the password reset request.
   * If the form is valid, sends a reset email using AuthService and navigates to login.
   * Displays appropriate success or error messages based on the outcome.
   */
  async resetPassword() {
    if (this.form.invalid) {
      this.error = true;
      this.success = false;
      return;
    }

    const { email } = this.form.value;

    try {
      await this.authService.resetPassword(email!);
      await this.router.navigate(['/login']);
      this.success = true;
      this.error = false;
    } catch (err) {
      console.error('Error al enviar el correo de recuperación:', err);
      this.error = true;
      this.success = false;
    }
  }

  /**
   * Navigates the user back to the login screen.
   */
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
