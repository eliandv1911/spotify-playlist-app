import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AUTH_PORT } from '../../domain/ports/auth.port';
import { AuthPort } from '../../domain/ports/auth.port';

/**
 * Route guard that checks whether the user is authenticated before allowing access to a route.
 * If the user is not authenticated, redirects them to the login page.
 * 
 * @author Elian.Diaz
 */
export const authGuard: CanActivateFn = async () => {
  const auth = inject<AuthPort>(AUTH_PORT);
  const router = inject(Router);

  const isLoggedIn = await auth.isAuthenticated();

  if (!isLoggedIn) {
    return router.createUrlTree(['/login']);
  }

  return true;
};
