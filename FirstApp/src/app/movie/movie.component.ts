import {Component, OnInit} from '@angular/core';
import {Movie} from './../../models/movie';
import {fakeMovies} from '../fake-movies';
import {MovieService} from './../movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  constructor(private movieService: MovieService) {}
  movie: Movie = {
    id: 1,
    name: 'Mr.Vull',
    releaseYear: 2019,
  };

  // movies = fakeMovies;
  movies: Movie[];

  selectedMovie: Movie;

  ngOnInit() {
    this.getMoviesFromService();
  }

  // getMoviesFromService() {
  //   this.movies = this.movieService.getMovie();
  // }

  getMoviesFromService() {
    this.movieService.getMovie().subscribe(updateMovies => {
      this.movies = updateMovies;
      console.log(`this.movies = ${JSON.stringify(this.movies)}`);
    });
  }

  addMovie(name: string, releaseYear: string): void {
    name = name.trim();
    if (
      Number.isNaN(Number(releaseYear)) ||
      !name ||
      Number(releaseYear) === 0
    ) {
      alert('Name must not be blank, Release year must be a number');
      return;
    }
    const newMovie: Movie = new Movie();
    newMovie.name = name;
    newMovie.releaseYear = Number(releaseYear);
    this.movieService.addMovie(newMovie).subscribe(insertedMovie => {
      this.movies.push(insertedMovie);
    });
  }

  deleteMovie(movieId: number): void {
    this.movieService.deleteMovie(movieId).subscribe(_ => {
      this.movies = this.movies.filter(eachMovie => eachMovie.id !== movieId);
    });
  }

  // onSelect(movie: Movie): void {
  //   this.selectedMovie = movie;
  //   // console.log(movie.id + ' / ' + movie.name + ' / ' + movie.releaseYear);
  //   // console.log('select Movie: ' + JSON.stringify(this.selectedMovie));
  //   // alert('select Movie: ' + JSON.stringify(this.selectedMovie));
  // }
}
