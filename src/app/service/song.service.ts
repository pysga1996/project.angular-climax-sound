import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Song} from '../model/song';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) {
  }

  getSongList() {
    return this.http.get<any>(`${environment.apiUrl}/song/list`);
  }

  updateSong(song, id: number) {
    return this.http.put<any>(`${environment.apiUrl}/song/edit?id=${id}`, song);
  }

  uploadSong(formData): Observable<HttpEvent<any>> {
    return this.http.post<any>(`${environment.apiUrl}/song/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  addSongToPlaylist(songId: number, playlistId: number) {
    return this.http.post(`${environment.apiUrl}/song/add-to-playlist?songId=${songId}&playlistId=${playlistId}`, '');
  }

  getdetailSong(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/song/detail?id=${id}`);
  }

  deletePlaylistSong(songId: number, playlistId: number): Observable<HttpEvent<any>> {
    return this.http.put<any>
    (`${environment.apiUrl}/song/delete-playlist-song?songId=${songId}&playlistId=${playlistId}`, {responseType: 'text'});
  }

  getNewSong() {
    return this.http.get<any>(`${environment.apiUrl}/song/sortByDate`);
  }
}
