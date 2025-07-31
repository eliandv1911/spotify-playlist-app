import { Song } from "./song.model";


/**
 * Interface that represents a playlist, which includes a list name and a collection of songs.
 * 
 * @author Elian.Diaz
 */
export interface Playlist {
  listName: string;
  songs: Song[];
}
