import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../application/search.service';
import { Song } from '../../domain/models/song.model';
import { Auth } from '@angular/fire/auth';
import { PlaylistService } from '../../application/playlist.service';

/**
 * SearchComponent allows users to search for songs using the Spotify API,
 * preview them, and add them to existing or new playlists.
 * 
 * It handles pagination, loading states, and modal interactions.
 * 
 * @author Elian
 */
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss'
})
export class SearchComponent {
  songs: Song[] = [];
  playlistInputs: { [songId: string]: string } = {};
  auth = inject(Auth);
  searchTerm: string = '';
  selectedList: string = '';
  currentPage: number = 0;
  pageSize: number = 12;
  totalResults: number = 0;

  selectedSong: Song | null = null;
  selectedListName: string = '';
  newListName: string = '';
  playlists: { listName: string }[] = [];

  isLoading = false;

  constructor(
    private searchService: SearchService,
    private playlistService: PlaylistService
  ) { }

  ngOnInit(): void {
    this.loadUserPlaylists();
  }

  /**
   * Loads the current user's playlists for use in song modal selection.
   */
  async loadUserPlaylists(): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) return;

    try {
      this.playlists = await this.playlistService.getUserPlaylists(user.uid);
    } catch (error) {
    }
  }

  /**
   * Executes the search based on the current page and search term.
   * 
   * @param page Page number for paginated results.
   */
  search(page: number = 0): void {
    this.isLoading = true;
    const offset = page * this.pageSize;

    this.searchService.search(this.searchTerm, offset, this.pageSize).subscribe({
      next: (response) => {
        this.totalResults = response.tracks.total;
        this.songs = response.tracks.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          artists: item.artists.map((a: any) => a.name).join(', '),
          album: item.album.name,
          imageUrl: item.album.images[0]?.url || '',
          previewUrl: item.preview_url
        }));
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      }
    });
  }

  /**
   * Triggered by the search input.
   */
  searchTracks(): void {
    this.currentPage = 0;
    this.search(this.currentPage);
  }

  /**
   * Changes the current page for pagination.
   * 
   * @param page Page number to navigate to.
   */
  changePage(page: number): void {
    if (page < 0 || page * this.pageSize >= this.totalResults) return;
    this.currentPage = page;
    this.search(page);
  }

  /**
   * Generates an array of page numbers to be displayed in the pagination component.
   */
  getPageRange(): number[] {
    const totalPages = Math.ceil(this.totalResults / this.pageSize);
    const maxPagesToShow = 5;
    const start = Math.max(0, this.currentPage - Math.floor(maxPagesToShow / 2));
    const end = Math.min(start + maxPagesToShow, totalPages);
    return Array.from({ length: end - start }, (_, i) => start + i);
  }

  /**
   * Adds a selected song to the user's playlist.
   * 
   * @param song Song to add.
   * @param listName Name of the playlist.
   */
  async addToPlaylist(song: Song, listName: string): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) {
      alert('Debes iniciar sesión para agregar canciones a tus playlists.');
      return;
    }
    if (!listName || !listName.trim()) {
      alert('Debes escribir un nombre para la lista.');
      return;
    }

    await this.playlistService.addSongToList(song, listName.trim());
  }

  /**
   * Opens the modal to add a song to a playlist (existing or new).
   * 
   * @param song Song to be added.
   */
  async openModal(song: Song) {
    this.selectedSong = song;
    this.newListName = '';

    const user = this.auth.currentUser;
    if (user) {
      this.playlists = await this.playlistService.getUserPlaylists(user.uid);
      this.selectedListName = this.playlists.length > 0 ? this.playlists[0].listName : '__custom__';
    }
  }

  /**
   * Confirms the addition of the selected song to the chosen playlist.
   */
  confirmAdd() {
    if (!this.selectedSong) return;

    const listName = this.selectedListName === '__custom__'
      ? this.newListName.trim()
      : this.selectedListName;

    if (!listName) {
      alert('Debes escribir un nombre para la lista.');
      return;
    }

    this.addToPlaylist(this.selectedSong, listName);

    this.selectedSong = null;
    this.selectedListName = '';
    this.newListName = '';
  }
}
