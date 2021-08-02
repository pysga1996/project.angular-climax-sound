import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { filter, map, tap } from 'rxjs/operators';
import { Artist } from '../model/artist';
import { PagingInfo } from '../model/paging-info';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  constructor(private http: HttpClient) {}

  artistList(): Observable<PagingInfo<Artist>> {
    return this.http.get<PagingInfo<Artist>>(`${environment.apiUrl}/artist/list`);
  }

  artistDetail(id: number): Observable<Artist> {
    return this.http.get<Artist>(`${environment.apiUrl}/artist/detail?id=${id}`);
  }

  getSongListOfArtist(id: number, page: number) {
    return this.http.get<any>(`${environment.apiUrl}/artist/song-list?artist-id=${id}&page=${page}`);
  }

  searchArtist(name: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/artist/search?name=${name}`).pipe(
      tap((response: any) => {
        if (response) {
          response.map(artist => artist.name);
        }
      })
    );
  }

  uploadArtist(formData: FormData): Observable<HttpEvent<any>> {
    return this.http.post<any>(`${environment.apiUrl}/artist/create`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  deleteArtist(id: number) {
    return this.http.delete<any>(`${environment.apiUrl}/artist/delete?id=${id}`);
  }

  getArtistDetail(id: number): Observable<Artist> {
    return this.http.get<Artist>(`${environment.apiUrl}/artist/detail?id=${id}`);
  }

  updateArtist(formGroup: FormData, id: number): Observable<HttpEvent<any>> {
    return this.http.put<any>(`${environment.apiUrl}/artist/update?id=${id}`, formGroup);
  }
}
