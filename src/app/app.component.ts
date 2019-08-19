import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { WebsocketService } from "./websocket.service";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import { Message } from "./model/message";
import { MessageType } from "./model/message-type.enum";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

export class AppComponent implements OnInit {
  title = "pocangular";
  // private serveUrl = environment.url + "squadninja";
  // isLoaded: boolean = false;
  // private stompClient;
  private usernameForm: FormGroup;
  // private messageForm:FormGroup;
  // messages: Message[] =[];

  constructor(private wsService: WebsocketService) {
    wsService.webSocketConnect();
  }

  ngOnInit() {
    this.usernameForm = new FormGroup({
      username: new FormControl(null, [Validators.required])
    });
    this.wsService.webSocketConnect();
  }
  // webSocketConnect() {
  //   let ws = new SockJS(this.serveUrl);
  //   this.stompClient = Stomp.over(ws);
  //   let that = this;
  //   this.stompClient.connect({}, function(frame) {
  //     that.isLoaded = true;
  //     that.openGlobalSocket();
  //   });
  // }

  sendUserName() {
    let message: Message = {
      message:null,
      sender: this.usernameForm.value.username,
      type: MessageType.JOIN
    };

    this.wsService.username=this.usernameForm.value.username;

    this.wsService.stompClient.subscribe("/topic/public", message => {
      if (message.body) {
        let messagebody: Message = JSON.parse(message.body);
        console.log(messagebody);
      }
    });
    this.wsService.stompClient.send("/app/chat.register", {}, JSON.stringify(message));
  }
  
  // openGlobalSocket() {
  //   this.stompClient.subscribe("/topic/public",(message)=>{
  //     this.handleResult(message);
  //   })
  // }
  // handleResult(message) {
  //   if (message.body) {
  //     let messageResult: Message = JSON.parse(message.body);
  //     console.log(messageResult);
  //     this.messages.push(messageResult);
  //   }
  // }
}
