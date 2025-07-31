import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideHttpClient } from '@angular/common/http';
import { AUTH_PROVIDERS } from './infrastructure/auth/auth.provider';
import { PLAYLIST_PROVIDERS } from './infrastructure/playlist/playlist.provider';
import { SEARCH_PROVIDERS } from './infrastructure/search/search.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideHttpClient(),
    ...PLAYLIST_PROVIDERS,
    ...SEARCH_PROVIDERS,
    ...AUTH_PROVIDERS
  ]
};
