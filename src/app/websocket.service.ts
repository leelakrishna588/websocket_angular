import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {Message} from '../app/model/message';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ErrorObservable} from 'rxjs-compat/observable/ErrorObservable';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {

  url: string = environment.url + "api/squadninja";
  private serveUrl = environment.url + "squadninja";
  messages: Message[] = [];

  public stompClient;
  public username:string;

  constructor(private http: HttpClient) { }

    // get username():string{
    //   return this.username;
    // }

    // set username(username:string){
    //   this.username=username;
    // }

    post(data: Message) {
      return this.http.post<Message>(this.url, data)
      .map((data:Message)=>{return data; })
      .catch(error => {
        return new ErrorObservable(error);
      })
      ;
    }

    webSocketConnect() {
      let ws = new SockJS(this.serveUrl);
      this.stompClient = Stomp.over(ws);
      let that = this;
      this.stompClient.connect({}, function(frame) {
        // that.openGlobalSocket();
      });
    }

    openGlobalSocket() {
      this.stompClient.subscribe("/topic/public/chat",(message)=>{
        this.handleResult(message);
      })
    }
    handleResult(message) {
      if (message.body) {
        let messageResult: Message = JSON.parse(message.body);
        console.log(messageResult);
        this.messages.push(messageResult);
      }
    }
  }
