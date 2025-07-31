import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AUTH_PORT } from '../../domain/ports/auth.port';
import { AuthPort } from '../../domain/ports/auth.port';

/**
 * Route guard that prevents authenticated users from accessing guest-only routes (e.g. login or register).
 * If the user is already authenticated, redirects them to the /search page.
 * 
 * @author Elian.Diaz
 */
export const guestGuard: CanActivateFn = async () => {
  const auth = inject<AuthPort>(AUTH_PORT);
  const router = inject(Router);

  const isLoggedIn = await auth.isAuthenticated();

  if (isLoggedIn) {
    return router.createUrlTree(['/search']);
  }

  return true;
};
