import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule , routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { WebsocketService } from './websocket.service';
import {ToastrModule} from 'ngx-toastr';
import {ReactiveFormsModule} from "@angular/forms";
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot({timeOut:3000}),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
