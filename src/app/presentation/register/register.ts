import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../application/auth.service';

/**
 * RegisterComponent handles the user registration form logic,
 * including form validation and interaction with the AuthService.
 * 
 * @author Elian
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  error = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  /**
   * Initializes the registration form with validation rules and a custom validator.
   * 
   * @param fb - FormBuilder for constructing the reactive form.
   */
  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  /**
   * Handles user registration logic.
   * If the form is valid, it sends the registration data to the AuthService.
   * On success, navigates to login; otherwise, sets an error flag.
   */
  async register() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      try {
        await this.authService.register(email!, password!);
        await this.router.navigate(['/login']);
        this.error = false;
      } catch (err) {
        this.error = true;
      }
    } else {
      this.error = true;
    }
  }

  /**
   * Custom validator to check if password and confirmPassword match.
   * 
   * @param group - The form group containing password fields.
   * @returns A validation error object if mismatch, otherwise null.
   */
  private passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  /**
   * Navigates to the login page.
   */
  goToLogin() {
    this.router.navigate(['/login']);
  }

  // Getters
  get email() {
    return this.registerForm.get('email')!;
  }

  get password() {
    return this.registerForm.get('password')!;
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword')!;
  }
}
