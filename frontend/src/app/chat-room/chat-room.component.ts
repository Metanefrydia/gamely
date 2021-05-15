import { AuthenticationService } from './../authentication/authentication.service';
import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { IMsg, IMsgType } from 'src/models/IMessage.js';
import { IPeerJs } from 'src/models/peerJS.js';
import { from, Subject } from 'rxjs';
import { mergeMap, takeUntil, tap } from 'rxjs/operators';
import { WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment.js';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  public msg: string = '';
  public messages: IMsg[] = [];
  public end$ = new Subject();
  public socket = new WebSocketSubject<IMsg>(environment.url);
  public _room = '';
  public room = '';
  public _name: string = '';
  public name: string = '';
  public localStream!: MediaStream;
  public remoteStreams: MediaStream[] = [];
  public myPeer!: IPeerJs;
  public peers: {
    [id: string]: any;
  } = {};
  public id: string = '';
  public remoteNames: string[] = [];
  public members: any = [];

  public constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.socket.pipe(takeUntil(this.end$)).subscribe(
      (m) => {
        switch (m.type) {
          case 'connection':
            if (m.message === 'Welcome') {
              this.id = m.id;
            }
            this.getMembers();
            break;
          case 'message':
            this.messages.push(m);
            break;
          case 'available':
            const call = this.myPeer.call(m.id, this.localStream);
            this.connectToNewUser(call);
            break;
          case 'leave':
            this.peers[m.id]?.close();
            this.getMembers();
            break;
          case 'getMembers':
            this.members = m.message;
            break;
        }
      },
      (err) => {
        console.error(err);
        this.name = '';
        this.room = '';
      }
    );

    this.setName(this.authenticationService.getUserDetails().name);

    this.route.paramMap.subscribe((params) => {
      this.setRoom(params.get('id'));
    });
  }

  public getMembers(): void {
    this.sendMessage('', 'getMembers');
  }

  public setName(value: string) {
    if (value) {
      this.name = value;
      this.sendMessage(this.name, 'connection');
    }
  }

  public initVideo() {
    from(
      navigator.mediaDevices.getUserMedia({
        audio: {
          autoGainControl: false,
          channelCount: 2,
          echoCancellation: false,
          latency: 0,
          noiseSuppression: false,
          sampleRate: 48000,
          sampleSize: 16,
        },
        video: false
      })
    )
      .pipe(
        tap((stream) => (this.localStream = stream)),
        mergeMap(() =>
          // @ts-ignore
          from(import('./../../assets/peer.js'))
        )
      )
      .pipe(takeUntil(this.end$))
      .subscribe((data) => {
        this.myPeer = new data.default(this.name) as IPeerJs;
        this.myPeer.on('open', (id) => {
          console.log(id);
        });
        this.myPeer.on('call', (call) => {
          call.answer(this.localStream);
          this.connectToNewUser(call);
        });
      });
  }

  public startCall() {
    this.sendMessage(this.name, 'available');
  }

  public sendMessage(message: string, type: IMsgType = 'message') {
    this.socket.next({ type, id: this.room, message });
    this.msg = '';
  }

  public setRoom(value: string) {
    if (value) {
      this.room = value;
      this.sendMessage(this.room, 'join');
      this.initVideo();
    }
  }

  public connectToNewUser(call: any) {
    call.on('stream', (stream: MediaStream) => {
      this.remoteStreams.push(stream);
      this.peers[call.peer] = call;
      this.remoteNames = Object.keys(this.peers);
    });
    call.on('close', () => {
      this.peers[call.peer].close();
    });
  }

  public ngOnDestroy() {
    this.end$.next(1);
  }
}
