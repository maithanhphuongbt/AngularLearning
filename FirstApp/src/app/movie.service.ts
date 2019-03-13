import {Injectable} from '@angular/core';
import {Movie} from './../models/movie';
import {fakeMovies} from './fake-movies';

// Get data asynchronously with Observable
import {Observable, of, from} from 'rxjs'; // Object bị theo dõi khi có sự thay đổi thì sẽ nhảy vào
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private moviesURL = 'http://localhost:3000/movies';

  getMovie(): Observable<Movie[]> {
    // this.messageService.add(`${new Date().toLocaleString()} Get movie list`);
    // return of(fakeMovies);
    return this.http.get<Movie[]>(this.moviesURL).pipe(
      tap(receivedMovies =>
        console.log(`receivedMovies = ${JSON.stringify(receivedMovies)}`)
      ),
      catchError(error => of([]))
    );
  }

  getMovieFromId(id: number): Observable<Movie> {
    return of(fakeMovies.find(movie => movie.id === id));
  }

  updateMovie(movie: Movie): Observable<any> {
    return this.http
      .put(`${this.moviesURL}/${movie.id}`, movie, httpOptions)
      .pipe(
        tap(updateMovie =>
          console.log(`update movie = ${JSON.stringify(updateMovie)}`)
        ),
        catchError(error => of(new Movie()))
      );
  }

  addMovie(newMovie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.moviesURL, newMovie, httpOptions).pipe(
      tap((movie: Movie) =>
        console.log(`insserted movie = ${JSON.stringify(movie)}`)
      ),
      catchError(error => of(new Movie()))
    );
  }

  deleteMovie(movieId: number): Observable<Movie> {
    const url = `${this.moviesURL}/${movieId}`;
    return this.http.delete<Movie>(url, httpOptions).pipe(
      tap(_ => console.log(`Delete movie with id = ${movieId}`)),
      catchError(error => of(null))
    );
  }

  searchMovie(typedString: string): Observable<Movie[]> {
    if (!typedString.trim()) {
      return of([]);
    }
    return this.http.get<Movie[]>(`${this.moviesURL}?name_like=${typedString}`).pipe(
      tap(foundedMovie => console.log(`fonded movies = ${JSON.stringify(foundedMovie)}`)),
      catchError(error => of(null))
    );
  }

  constructor(
    public messageService: MessageService,
    private http: HttpClient
  ) {}
}
// export class MovieService {
//   getMovie(): Movie[] {
//     return fakeMovies;
//   }
//   constructor() { }
// }
