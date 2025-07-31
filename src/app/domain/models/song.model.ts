/**
 * Interface that represents a song with its metadata information.
 * 
 * @author Elian.Diaz
 */
export interface Song {
  id: string;
  name: string;
  artists: string;
  album: string;
  imageUrl: string;
  previewUrl: string | null;
}
