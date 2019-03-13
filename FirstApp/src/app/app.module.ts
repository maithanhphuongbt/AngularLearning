import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MovieComponent} from './movie/movie.component';
import {FormsModule} from '@angular/forms';
import {MovieDetailComponent} from './movie-detail/movie-detail.component';
import {MovieService} from './movie.service';
import {MessageService} from './message.service';
import {MessagesComponent} from './messages/messages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import { MovieSearchComponent } from './movie-search/movie-search.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    MovieDetailComponent,
    MessagesComponent,
    DashboardComponent,
    MovieSearchComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [MovieService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
