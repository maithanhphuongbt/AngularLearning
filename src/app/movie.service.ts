import { Injectable } from '@angular/core';
import { Movie } from './../models/movie';
import { fakeMovies } from './fake-movies';

// Get data asynchronously with Observable
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  getMovie(): Observable<Movie[]> {
    this.messageService.add(`${ new Date().toLocaleString()} Get movie list`);
    return of(fakeMovies);
  }

  getMovieFromId(id: number): Observable<Movie> {
    return of(fakeMovies.find(movie => movie.id === id));
  }

  constructor(public messageService: MessageService) { }
}
// export class MovieService {
//   getMovie(): Movie[] {
//     return fakeMovies;
//   }
//   constructor() { }
// }
