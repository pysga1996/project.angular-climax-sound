import {Component, OnDestroy, OnInit} from '@angular/core';
import {Song} from '../../model/song';
import {ActivatedRoute} from '@angular/router';
import {SongService} from '../../service/song.service';
import {PlayingQueueService} from '../../service/playing-queue.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  private message;
  private songList: Song[];
  private subscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private songService: SongService, private playingQueueService: PlayingQueueService) {
  }

  ngOnInit() {
    this.goToPage();
  }

  addToPlaying(song) {
    song.isDisabled = true;
    this.playingQueueService.emitChange(song);
  }

  goToPage() {
    this.subscription.add(this.songService.getTop10SongsByFrequency().subscribe(
      result => {
        if (result != null) {
          window.scroll(0, 0);
          this.songList = result;
          this.songList.forEach((value, index) => {
            this.songList[index].isDisabled = false;
          });
        }
      }, error => {
        this.message = 'Cannot retrieve song list. Cause: ' + error.songsMessage;
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
