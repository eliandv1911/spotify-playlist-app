import { AUTH_PORT } from '../../domain/ports/auth.port';
import { FirebaseAuthAdapter } from './auth.adapter';

/**
 * Auth provider configuration using Dependency Injection.
 * Binds the abstract AuthPort to its concrete implementation FirebaseAuthAdapter.
 *
 * @author Elian.Diaz
 */
export const AUTH_PROVIDERS = [
  {
    provide: AUTH_PORT,
    useClass: FirebaseAuthAdapter
  }
];
