import {Component, OnInit} from '@angular/core';
import {Movie} from './../../models/movie';
import {fakeMovies} from '../fake-movies';
import { MovieService } from './../movie.service';

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
    this.movieService.getMovie().subscribe(
      (updateMovies) => {
        this.movies = updateMovies;
        console.log(`this.movies = ${JSON.stringify(this.movies)}`);
      }
    );
  }

  // onSelect(movie: Movie): void {
  //   this.selectedMovie = movie;
  //   // console.log(movie.id + ' / ' + movie.name + ' / ' + movie.releaseYear);
  //   // console.log('select Movie: ' + JSON.stringify(this.selectedMovie));
  //   // alert('select Movie: ' + JSON.stringify(this.selectedMovie));
  // }
}
