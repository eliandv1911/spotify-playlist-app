import { Component, OnInit, inject } from '@angular/core';
import { Song } from '../../domain/models/song.model';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { PlaylistService } from '../../application/playlist.service';

/**
 * PlaylistsComponent is responsible for displaying and managing
 * the user's playlists, including loading and removing songs.
 * 
 * @author Elian.Diaz
 */
@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playlists.html',
  styleUrls: ['./playlists.scss']
})
export class PlaylistsComponent implements OnInit {
  auth = inject(Auth);
  playlists: { listName: string, songs: Song[] }[] = [];
  isLoading = true;

  /**
   * Injects the PlaylistService used for playlist-related operations.
   * 
   * @param playlistService - Application service for retrieving and modifying playlists.
   */
  constructor(private playlistService: PlaylistService) { }

  /**
   * Triggers the initial loading of playlists.
   */
  ngOnInit() {
    this.loadPlaylists();
  }

  /**
   * Loads playlists from the PlaylistService and updates the component state.
   * Manages loading indicators and error handling.
   */
  loadPlaylists() {
    this.isLoading = true;
    this.playlistService.getPlaylists()
      .then(playlists => {
        this.playlists = playlists;
        this.isLoading = false;
      })
      .catch(error => {
        this.isLoading = false;
      });
  }

  /**
   * Removes a song from the playlists by its ID using the PlaylistService.
   * Reloads the playlists after successful removal.
   * 
   * @param songId - The unique identifier of the song to remove.
   */
  async remove(songId: string) {
    try {
      await this.playlistService.removeSongFromList(songId);
      this.loadPlaylists();
    } catch (error) {
    }
  }
}