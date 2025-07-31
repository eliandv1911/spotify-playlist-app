import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, deleteDoc, doc, query, where } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { PlaylistPort } from '../../domain/ports/playlist.port';
import { Song } from '../../domain/models/song.model';
import { Playlist } from '../../domain/models/playlist.model';

/**
 * Adapter that implements the PlaylistPort interface using Firebase Firestore
 * to manage user playlists and their songs.
 * 
 * @author Elian.Diaz
 */
@Injectable({ providedIn: 'root' })
export class PlaylistAdapter implements PlaylistPort {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  /**
   * Adds a song to a user's playlist in Firestore.
   * If the user is not authenticated, an error is thrown.
   */
  async addSongToList(song: Song, listName: string): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('No authenticated user');

    const playlistRef = collection(this.firestore, 'playlists');
    await addDoc(playlistRef, {
      ...song,
      uid: user.uid,
      listName
    });
  }

  /**
   * Retrieves all playlists for the authenticated user, grouped by list name.
   * Returns an empty array if no user is authenticated.
   */
  async getPlaylists(): Promise<Playlist[]> {
    const user = this.auth.currentUser;
    if (!user) return [];

    const playlistRef = collection(this.firestore, 'playlists');
    const q = query(playlistRef, where('uid', '==', user.uid));
    const snapshot = await getDocs(q);

    const grouped: Record<string, Song[]> = {};
    snapshot.docs.forEach(docSnap => {
      const data = docSnap.data();
      const song: Song = {
        id: docSnap.id,
        name: data['name'],
        artists: data['artists'],
        album: data['album'],
        imageUrl: data['imageUrl'],
        previewUrl: data['preview_url']
      };
      if (!grouped[data['listName']]) grouped[data['listName']] = [];
      grouped[data['listName']].push(song);
    });

    return Object.entries(grouped).map(([listName, songs]) => ({
      listName,
      songs
    }));
  }

  /**
   * Removes a song from the Firestore playlist collection by its document ID.
   */
  async removeSongFromList(songId: string): Promise<void> {
    const docRef = doc(this.firestore, 'playlists', songId);
    await deleteDoc(docRef);
  }

  /**
   * Retrieves a list of playlist names for a specific user by UID.
   */
  async getUserPlaylists(userId: string): Promise<{ listName: string }[]> {
    const playlistsRef = collection(this.firestore, 'playlists');
    const q = query(playlistsRef, where('uid', '==', userId));
    const querySnapshot = await getDocs(q);

    const listNames = new Set<string>();
    querySnapshot.docs.forEach((doc) => {
      const name = doc.data()['listName'];
      if (name) listNames.add(name);
    });

    return Array.from(listNames).map((listName) => ({ listName }));
  }
}
