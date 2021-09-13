import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Artist } from './artist';
import { Observable } from 'rxjs';
import { HttpEvent } from '@angular/common/http';
import { Song } from './song';

export class SongUploadData {
  public readonly formData: FormData;
  formGroup: FormGroup;
  filteredArtists: Artist[];
  observable?: Observable<HttpEvent<Song>> | null;
  type?: 'create' | 'update' = 'create';

  constructor(formGroup: FormGroup, filteredSongArtists: Artist[] = [], type: 'create' | 'update' = 'create') {
    this.formData = new FormData();
    this.formGroup = formGroup;
    this.filteredArtists = filteredSongArtists;
    this.type = type;
  }

  public static instance(fb: FormBuilder): SongUploadData {
    return new SongUploadData(
      fb.group({
        id: [null],
        title: ['', Validators.compose([Validators.required])],
        artists: fb.array([fb.control(null, Validators.compose([Validators.required]))]),
        releaseDate: ['', Validators.compose([Validators.required])],
        album: [null],
        genres: [null],
        tags: [null],
        country: [null],
        theme: [null],
        duration: [null],
        url: [null]
      }),
      []
    );
  }

  public static createArtist(fb: FormBuilder): FormControl {
    return fb.control(null);
  }

  isValid(needUpload?: boolean): boolean {
    if (needUpload) {
      return this.formData.get('audio') && this.formGroup.valid;
    }
    return this.formGroup.valid;
  }

  setup(): FormData {
    this.formData.set('song', new Blob([JSON.stringify(this.formGroup.getRawValue())], { type: 'application/json' }));
    return this.formData;
  }
}
