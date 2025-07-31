import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Abstract class that defines the contract for searching songs from a data source.
 * @author Elian.Diaz
 */
export abstract class SearchPort {
  abstract searchSongs(query: string, offset?: number, limit?: number): Observable<any>;
}

export const SEARCH_PORT = new InjectionToken<SearchPort>('SearchPort');
