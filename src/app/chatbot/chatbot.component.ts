import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";

import { WebsocketService } from "../websocket.service";
import * as Stomp from "stompjs";
import { Message } from "../model/message";
import { MessageType } from "../model/message-type.enum";

@Component({
  selector: "app-chatbot",
  templateUrl: "./chatbot.component.html",
  styleUrls: ["./chatbot.component.css"]
})
export class ChatbotComponent implements OnInit {
  private messageForm: FormGroup;
  
  // messages :Message[]=[];

  constructor(private wsService: WebsocketService) {
    wsService.webSocketConnect();
  }

  ngOnInit() {
    this.messageForm = new FormGroup({
      msg: new FormControl(null,[Validators.required])
    });
    this.wsService.webSocketConnect();
  }

  sendMessage() {
    if (this.messageForm.valid) {
      // if (this.messageForm.value.msg && this.wsService.stompClient) {
      let message: Message = {
        message: this.messageForm.controls.msg.value,
        sender: this.wsService.username,
        type: MessageType.CHAT
      };

      this.wsService.stompClient.send(
        "/app/chat.send",
        {},
        JSON.stringify(message)
      );
      console.log(message);
      // }
      this.wsService.stompClient.subscribe("/topic/public/chat", message => {
        if (message.body) {
          let messagebody: Message = JSON.parse(message.body);
          console.log(messagebody);
        }
      });
    }
  }
}
