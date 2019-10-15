import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Song} from '../../model/song';
import {Playlist} from '../../model/playlist';
import {PlaylistService} from '../../service/playlist.service';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.scss']
})
export class PlaylistListComponent implements OnInit, OnDestroy {
  private message;
  private subscription: Subscription = new Subscription();
  private playlistList: Playlist[] = [];
  constructor(private playlistService: PlaylistService) { }

  ngOnInit() {
    // this.subscription.unsubscribe();
    this.subscription = this.playlistService.getPlaylistList().subscribe(
      result => {
        if (result != null) {
          this.playlistList = result.content;
          this.playlistList.forEach((value, index) => {
            this.playlistList[index].isDisabled = false;
          });
        }
      }, error => {
        this.message = 'Cannot retrieve Playlist list. Cause: ' + error.message;
      }
    );
  }

  createPlaylist() {
    // this.subscription.unsubscribe();
    this.subscription = this.playlistService.getPlaylistList().subscribe(
      result => {
        if (result != null) {
          this.playlistList = result.content;
          this.playlistList.forEach((value, index) => {
            this.playlistList[index].isDisabled = false;
          });
        }
      }, error => {
        this.message = 'Cannot retrieve Playlist list. Cause: ' + error.message;
      }
    );
  }

  deletePlaylist() {
    // this.subscription.unsubscribe();
    this.subscription = this.playlistService.getPlaylistList().subscribe(
      result => {
        if (result != null) {
          this.playlistList = result.content;
          this.playlistList.forEach((value, index) => {
            this.playlistList[index].isDisabled = false;
          });
        } else {
          this.playlistList = null;
        }
      }, error => {
        this.message = 'Cannot retrieve Playlist list. Cause: ' + error.message;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
