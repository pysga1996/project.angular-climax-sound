import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Song} from '../model/song';
import {PagingInfo} from '../model/paging-info';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) {
  }

  getSongList(page?: number, sort?: string): Observable<PagingInfo<Song>> {
    let requestUrl = `${environment.apiUrl}/song/list`;
    if (page || sort) {
      requestUrl = requestUrl + `?`;
      if (page) {
        requestUrl = requestUrl + `page=${page}`;
        if (sort) {
          requestUrl = requestUrl + `&`;
        }
      }
      if (sort) {
        requestUrl = requestUrl + `sort=${sort}`;
      }
    }
    return this.http.get<PagingInfo<Song>>(requestUrl, {withCredentials: true});
  }

  getTop10SongsByFrequency(): Observable<PagingInfo<Song>> {
    const params: HttpParams = new HttpParams({
      fromObject: {
        sort: 'listeningFrequency,desc'
      }
    });
    return this.http.get<PagingInfo<Song>>(`${environment.apiUrl}/song/list`, {params});
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
    // tslint:disable-next-line:max-line-length
    return this.http.put<any>(`${environment.apiUrl}/playlist/remove-song?song-id=${songId}&playlist-id=${playlistId}`, {responseType: 'text'});
  }

  listenToSong(songId: number) {
    return this.http.post<any>(`${environment.apiUrl}/song?listen&song-id=${songId}`, {});
  }

  likeSong(songId: number) {
    const params = {
      songId,
      isLiked: true
    };
    return this.http.patch<any>(`${environment.apiUrl}/song/like`, params);
  }

  unlikeSong(songId: number) {
    const params = {
      songId,
      isLiked: false
    };
    return this.http.patch<any>(`${environment.apiUrl}/song/like`, params);
  }

  getUserSongList() {
    return this.http.get<any>(`${environment.apiUrl}/song/uploaded/list`);
  }

  getUserFavoriteSongList(page?: number, sort?: string) {
    let requestUrl = `${environment.apiUrl}/song/my-song`;
    if (page || sort) {
      requestUrl = requestUrl + `?`;
      if (page) {
        requestUrl = requestUrl + `page=${page}`;
        if (sort) {
          requestUrl = requestUrl + `&`;
        }
      }
      if (sort) {
        requestUrl = requestUrl + `sort=${sort}`;
      }
    }
    return this.http.get<any>(requestUrl);
  }

  deleteSong(id: number) {
    return this.http.delete<any>(`${environment.apiUrl}/song/delete?id=${id}`);
  }

  commentSong(songId: number, comment: Comment) {
    return this.http.post<any>(`${environment.apiUrl}/song?comment&song-id=${songId}`, comment);
  }

  deleteComment(commentId: number) {
    return this.http.delete<any>(`${environment.apiUrl}/song?comment&comment-id=${commentId}`);
  }
}
