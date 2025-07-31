import { PLAYLIST_PORT } from "../../domain/ports/playlist.port";
import { PlaylistAdapter } from "./playlist.adapter";

/**
 * Provider array that binds the PLAYLIST_PORT abstraction
 * to its concrete implementation PlaylistAdapter.
 * 
 * @author Elian.Diaz
 */
export const PLAYLIST_PROVIDERS = [
  {
    provide: PLAYLIST_PORT,
    useClass: PlaylistAdapter
  }
];
