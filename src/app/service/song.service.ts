import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Song } from '../model/song';
import { PagingInfo } from '../model/paging-info';
import { HttpUtil } from '../util/http.util';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  constructor(private http: HttpClient) {}

  getSongList(option?: { page?: number; size?: number; sort?: string[] }): Observable<PagingInfo<Song>> {
    const requestUrl = `${environment.apiUrl}/song/list`;
    return this.http.get<PagingInfo<Song>>(requestUrl, { params: HttpUtil.buildParams(option), withCredentials: true });
  }

  updateSong(song: any, id: number): Observable<HttpEvent<Blob>> {
    return this.http.put<any>(`${environment.apiUrl}/song/edit?id=${id}`, song);
  }

  uploadSong(formData): Observable<HttpEvent<any>> {
    return this.http.post<any>(`${environment.apiUrl}/song/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  addSongToPlaylist(songId: number, playlistId: number) {
    return this.http.post(`${environment.apiUrl}/song/add-to-playlist?song-id=${songId}&playlist-id=${playlistId}`, '');
  }

  songDetail(id: number): Observable<Song> {
    return this.http.get<any>(`${environment.apiUrl}/song/detail?id=${id}`);
  }

  deleteSongFromPlaylist(songId: number, playlistId: number): Observable<HttpEvent<any>> {
    return this.http.put<any>(`${environment.apiUrl}/playlist/remove-song?song-id=${songId}&playlist-id=${playlistId}`, {
      responseType: 'text'
    });
  }

  listenToSong(songId: number) {
    return this.http.post<any>(`${environment.apiUrl}/song?listen&song-id=${songId}`, {});
  }

  likeSong(song: Song, isLiked: boolean) {
    const params = {
      songId: song.id,
      isLiked
    };
    song.loadingLikeButton = true;
    this.http.patch<any>(`${environment.apiUrl}/song/like`, params).subscribe(
      _ => {
        song.liked = isLiked;
      },
      error => {
        console.log(error);
      },
      () => {
        song.loadingLikeButton = false;
      }
    );
  }

  patchLikes(songs: Song[]) {
    const userSongLikeMap = {};
    songs.forEach(e => {
      userSongLikeMap[e.id] = e.liked;
    });
    this.http.patch<{ id: number; isLiked: boolean }>(`${environment.apiUrl}/song/like-map`, userSongLikeMap).subscribe(next => {
      songs.forEach(song => {
        song.liked = next[song.id];
      });
    });
  }

  getUserSongList() {
    return this.http.get<any>(`${environment.apiUrl}/song/uploaded/list`);
  }

  getUserFavoriteSongList(option?: { page?: number; size?: number; sort?: string[] }) {
    const requestUrl = `${environment.apiUrl}/song/my-song`;
    return this.http.get<PagingInfo<Song>>(requestUrl, { params: HttpUtil.buildParams(option) });
  }

  deleteSong(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/song/delete?id=${id}`);
  }

  commentSong(songId: number, comment: Comment) {
    return this.http.post<any>(`${environment.apiUrl}/song?comment&song-id=${songId}`, comment);
  }

  deleteComment(commentId: number) {
    return this.http.delete<any>(`${environment.apiUrl}/song?comment&comment-id=${commentId}`);
  }
}
