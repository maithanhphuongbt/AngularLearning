import {Component, OnInit} from '@angular/core';

// Add input's string to "stream"
import {Subject, of, from, Observable} from 'rxjs';
// debounceTime: thời gian minimum giữa hai lần gõ
// distinctUntilChanged: so sánh string mới và string cũ (nếu string trước và string sau giống nhau thì nó không lấy dữ liệu nữa)
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Movie} from './../../models/movie';
import { MovieService } from './../movie.service';
@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css'],
})
export class MovieSearchComponent implements OnInit {
  // $ = "asynchronous pipe" = asyncPipe (chay tiến trình riêng khi gửi kết quả vẫn gõ được text tiếp theo)
  movies$: Observable<Movie[]>;
  private searchedSubject = new Subject<string>();

  constructor(private movieService: MovieService) {}

  search(searchedString: string): void {
    console.log(`searchedString = ${searchedString}`);
    this.searchedSubject.next(searchedString);
  }

  ngOnInit() {
    this.movies$ = this.searchedSubject.pipe(
      debounceTime(300), // wait 300ms after each keysroke before considering the searched string
      distinctUntilChanged(), // ignore new string if save as previous string
      switchMap((searchedString: string) => this.movieService.searchMovie(searchedString))
    );
  }
}
