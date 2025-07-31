import { InjectionToken } from '@angular/core';
import { Song } from '../models/song.model';
import { Playlist } from '../models/playlist.model';

/**
 * Abstract class that defines the contract for playlist-related operations..
 * 
 * @author Elian.Diaz
 */
export abstract class PlaylistPort {
  abstract addSongToList(song: Song, listName: string): Promise<void>;
  abstract getPlaylists(): Promise<Playlist[]>;
  abstract removeSongFromList(songId: string): Promise<void>;
  abstract getUserPlaylists(userId: string): Promise<{ listName: string }[]>;
}

export const PLAYLIST_PORT = new InjectionToken<PlaylistPort>('PlaylistPort');
