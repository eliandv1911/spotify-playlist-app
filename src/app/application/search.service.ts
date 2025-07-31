import { Injectable, inject } from '@angular/core';
import { SEARCH_PORT, SearchPort } from '../domain/ports/search.port';

/**
 * Service responsible for handling song search functionality.
 * It delegates the search operation to the injected SearchPort.
 *
 * @author Elian.Diaz
 */
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchPort = inject<SearchPort>(SEARCH_PORT);

  /**
   * Searches for songs based on the given query.
   *
   * @param query - The search string used to find songs.
   * @param offset - The number of items to skip (pagination).
   * @param limit - The maximum number of items to return.
   * @returns An observable containing the list of matching songs.
   */
  search(query: string, offset = 0, limit = 10) {
    return this.searchPort.searchSongs(query, offset, limit);
  }
}
