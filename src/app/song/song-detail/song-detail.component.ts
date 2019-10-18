import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {SongService} from '../../service/song.service';
import {Artist} from '../../model/artist';
import {Song} from '../../model/song';
import {Comment} from '../../model/comment';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss']
})
export class SongDetailComponent implements OnInit, OnDestroy {
  @Input() song: Song;
  private message;
  private songId;
  private  artistList: Artist[];
  private  commentList: Comment[];
  commentForm: FormGroup;
  error = false;
  subscription: Subscription = new Subscription();
  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthService, private songservice: SongService) { }

  ngOnInit() {
    this.commentForm = this.fb.group({
      content: ['']
    });
    this.subscription.add(this.route.queryParams.subscribe(
      params => {
        this.songId = params.id;
        this.subscription.add(this.songservice.getdetailSong(this.songId).subscribe(
          result => {
            window.scroll(0, 0);
            this.song = result;
            this.artistList = this.song.artists;
            this.commentList = this.song.comments;
          }, error => {
            this.message = 'Cannot retrieve Song . Cause: ' + error.message;
          }
        ));
      }));
  }
  onSubmit() {
    this.subscription.add(this.songservice.commentSong(this.songId, this.commentForm.value).subscribe(
      () => {
        this.subscription.add(this.songservice.getdetailSong(this.songId).subscribe(
          result => {
            this.commentForm.reset();
            this.song = result;
            this.artistList = this.song.artists;
            this.commentList = this.song.comments;
          }, error => {
            this.message = 'Cannot retrieve Song . Cause: ' + error.message;
          }
        ));
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
