import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of, switchMap } from 'rxjs';
import { SearchPort } from '../../domain/ports/search.port';

/**
 * Adapter class that implements the SearchPort interface to interact with the Spotify API.
 * Handles authentication using the Client Credentials Flow and provides functionality to search for tracks.
 * 
 * @author Elian.Diaz
 */
@Injectable({
  providedIn: 'root'
})
export class SearchAdapter implements SearchPort {
  private token: string | null = null;
  private tokenExpiration: number | null = null;

  /**
   * Constructs the adapter with the required HttpClient dependency.
   * 
   * @param http - Angular's HttpClient used to perform HTTP requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * Retrieves a valid Spotify access token using the Client Credentials Flow.
   * If a valid token is already cached and not expired, it is reused.
   * 
   * @returns An Observable emitting the access token string, or null if unavailable.
   */
  private getAccessToken(): Observable<string | null> {
    if (this.token && this.tokenExpiration && Date.now() < this.tokenExpiration) {
      return of(this.token);
    }

    const body = new HttpParams().set('grant_type', 'client_credentials');
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${environment.spotifyClientId}:${environment.spotifyClientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<any>('https://accounts.spotify.com/api/token', body, { headers }).pipe(
      switchMap(response => {
        this.token = response.access_token;
        this.tokenExpiration = Date.now() + response.expires_in * 1000;

        return of(this.token);
      })
    );
  }

  /**
   * Performs a search query for songs using the Spotify API.
   * 
   * @param query - The search keyword (e.g. song name, artist).
   * @param offset - The starting index for paginated results (default: 0).
   * @param limit - Maximum number of results to return (default: 10).
   * @returns An Observable emitting the search results from the Spotify API.
   */
  searchSongs(query: string, offset: number = 0, limit: number = 10): Observable<any> {
    return this.getAccessToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });

        const params = new HttpParams()
          .set('q', query)
          .set('type', 'track')
          .set('limit', limit.toString())
          .set('offset', offset.toString());

        return this.http.get(`${environment.spotifyApiUrl}/search`, { headers, params });
      })
    );
  }
}
