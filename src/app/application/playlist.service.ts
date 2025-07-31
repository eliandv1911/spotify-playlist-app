import { Injectable, inject } from '@angular/core';
import { PLAYLIST_PORT, PlaylistPort } from '../domain/ports/playlist.port';
import { Song } from '../domain/models/song.model';

/**
 * Service class that acts as an intermediary between components and the playlist port.
 * It delegates playlist-related operations to the injected PlaylistPort implementation.
 * 
 * @author Elian.Diaz
 */
@Injectable({ providedIn: 'root' })
export class PlaylistService {
  private playlistPort = inject<PlaylistPort>(PLAYLIST_PORT);

  /**
   * Adds a song to a specific playlist for the current user.
   * 
   * @param song - The song to add.
   * @param listName - The name of the playlist.
   * @returns A Promise that resolves when the song is added.
   */
  addSongToList(song: Song, listName: string): Promise<void> {
    return this.playlistPort.addSongToList(song, listName);
  }

  /**
   * Retrieves all playlists and their songs for the current authenticated user.
   * 
   * @returns A Promise that resolves to an array of playlists with their songs.
   */
  getPlaylists(): Promise<{ listName: string, songs: Song[] }[]> {
    return this.playlistPort.getPlaylists();
  }

  /**
   * Removes a song from the user's playlists using the song ID.
   * 
   * @param songId - The ID of the song to remove.
   * @returns A Promise that resolves when the song is removed.
   */
  removeSongFromList(songId: string): Promise<void> {
    return this.playlistPort.removeSongFromList(songId);
  }

  /**
   * Retrieves the names of all playlists created by a specific user.
   * 
   * @param userId - The ID of the user.
   * @returns A Promise that resolves to an array of playlist names.
   */
  getUserPlaylists(userId: string): Promise<{ listName: string }[]> {
    return this.playlistPort.getUserPlaylists(userId);
  }
}