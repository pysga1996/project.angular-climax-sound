import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Album } from '../model/album';
import { Observable } from 'rxjs';
import { PagingInfo } from '../model/paging-info';
import { PlayingQueueService } from '../shared/layout/music-player/playing-queue.service';
import { tap } from 'rxjs/operators';
import { Song } from '../model/song';
import { AuthService } from './auth.service';
import { AlbumUpdate } from '../model/album-update';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  constructor(private http: HttpClient, private authService: AuthService, private playingQueueService: PlayingQueueService) {}

  albumList(page: number, sort = 'asc'): Observable<PagingInfo<Album>> {
    const requestUrl = `${environment.apiUrl}/album/list`;
    const params: { [key: string]: string } = { page: `${page}`, sort };
    return this.http.get<PagingInfo<Album>>(requestUrl, { params });
  }

  albumDetail(id: number): Observable<Album> {
    const params = { id };
    return this.http
      .get<Album>(`${environment.apiUrl}/album/detail`, { params })
      .pipe
      // tap(album => {
      //   album.songs.forEach(song => {
      //     song.isDisabled = this.playingQueueService.checkAlreadyInQueue(song?.url);
      //   });
      // })
      ();
  }

  uploadAlbum(formData: FormData): Observable<Album> {
    return this.http.post<Album>(`${environment.apiUrl}/album/upload`, formData);
  }

  updateAlbum(formData: FormData, id: number): Observable<Album> {
    return this.http.put<Album>(`${environment.apiUrl}/album/edit/${id}`, formData);
  }

  updateSongList(songList: AlbumUpdate[], albumId: number): Observable<void> {
    return this.http.patch<void>(`${environment.apiUrl}/album/update-song-list/${albumId}`, songList);
  }

  getUserAlbumList(page: number): Observable<PagingInfo<Album>> {
    return this.http.get<PagingInfo<Album>>(`${environment.apiUrl}/album/search`, {
      params: {
        page,
        username: this.authService.currentUserValue.user_name
      }
    });
  }
}
