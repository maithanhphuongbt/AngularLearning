# Angular

## Set up enviroment
 1. Create folder
 2. Open folder by visual studio code
 3. Install angular CLI
        
        npm install -g @angular/cli

 4. Create new app
 
        ng new my-app

 5. Run app:
 
        cd my-app
        ng serve --open

## Create component

        ng generate component component_name

## Create service

        ng generate service service_name
        
        
## Basic knowledge
### 1. Data binding
a. Trong HTML
    
        /*Binding 1 chiều*/
        [ngModel]="movie.name"
        
        /*Binding 2 chiều*/
        [(ngModel)]="movie.name"
b. Trong controller
        
        export class MovieDetailComponent implements OnInit {
        
            @Input() movie: Movie;
            
            constructor() { }
            movie: Movie = {
                    id: 1,
                    name: 'Mr.Vull',
                    releaseYear: 2019,
                }; 
            ngOnInit() {
          }
        }
       

### 2. ngFor
a. Trong HTML

        <li class="movieListItem" 
            *ngFor="let eachMovie of movies"
            [class.selected]="eachMovie === selectedMovie"
            (click)="onSelect(eachMovie)">
                {{eachMovie.name}} - {{eachMovie.releaseYear}}
        </li>
        
b.Trong controller:
    
         movies: Movie[];

### 3. Event binding
a. Trong HTML
        
        (click)="onSelect(eachMovie)

b. Trong controller
    
        onSelect(movie: Movie): void {
            this.selectedMovie = movie;
            // console.log(movie.id + ' / ' + movie.name + ' / ' + movie.releaseYear);
            // console.log('select Movie: ' + JSON.stringify(this.selectedMovie));
            // alert('select Movie: ' + JSON.stringify(this.selectedMovie));
        }

### 4. ngIf
a. Trong HTML 

        <div *ngIf="selectedMovie" class="detail">
            <h3>You select: {{selectedMovie.name}}. Detail:</h3>
            <table style="width: 100%">
                <tr>
                    <td>Name:</td>
                    <td><input type="text" placeholder="Name" [(ngModel)]="selectedMovie.name"></td>
                </tr>
                <tr>
                    <td>Release year:</td>
                    <td><input type="text" placeholder="Name" [(ngModel)]="selectedMovie.releaseYear"></td>
                </tr>
            </table>
        </div> 

b. Trong controller
    
        selectedMovie: Movie;
        onSelect(movie: Movie): void {
            this.selectedMovie = movie;
        }
        
### 5. Input decorator
5.1. Create component con
5.2. Init trong html cha với tham số.
    
        <app-movie-detail [movie]="selectedMovie"></app-movie-detail>

5.3. Create html cho component con:
    
        <div *ngIf="movie" class="detail">
          <h3>You select: {{movie.name}}. Detail:</h3>
          <table style="width: 100%">
              <tr>
                  <td>Name:</td>
                  <td><input type="text" placeholder="Name" [(ngModel)]="movie.name"></td>
              </tr>
              <tr>
                  <td>Release year:</td>
                  <td><input type="text" placeholder="Name" [(ngModel)]="movie.releaseYear"></td>
              </tr>
          </table>
        </div>
    
5.4. Đặt tham số truyền vào ở controller component con:
    
        @Input() movie: Movie;
    
### 6. Service
6.1 Create service:
    
    ng generate service service_name

6.2 Trong service
    
    export class MovieService {
      getMovie(): Movie[] {
        return fakeMovies;
      }
      constructor() { }
    }
6.4 Trong component cha:

     movies: Movie[];
     
     getMoviesFromService() {
        this.movies = this.movieService.getMovie();
     }
    
### 7. Rxjs Observable
7.1 Trong service:

    import { Observable, from, of } from 'rxjs';
    export class MovieService {
      getMovie(): Observable<Movie[]> {
        return of(fakeMovies);
      }
      constructor() { }
    }
7.2 Trong component cha:

      movies: Movie[];
    
      ngOnInit() {
        this.getMoviesFromService();
      }
      
      getMoviesFromService() {
        this.movieService.getMovie().subscribe(
          (updateMovies) => {
            this.movies = updateMovies;
            console.log(`this.movies = ${JSON.stringify(this.movies)}`);
          }
        );
      }


### 8. Call between Services
8.1 Create service

    ng generate service message --module=app
    
8.2 Create component

    ng generate component messages

8.3 Trong message service:

    export class MessageService {
      messages: string[] = [];
    
      add(message: string) {
        this.messages.push(message);
      }
    
      deleteAllMessage() {
        this.messages = [];
      }
      constructor() { }
    }
8.4 Trong movie service

    export class MovieService {
      getMovie(): Observable<Movie[]> {
        this.messageService.add(`${ new Date().toLocaleString()} Get movie list`);
        return of(fakeMovies);
      }
      constructor(public messageService: MessageService) { }
    }
8.5 Trong message controller

    export class MessagesComponent implements OnInit {
    
      constructor(public messageService: MessageService) { }
    
      ngOnInit() {
      }
    
    }
8.6 Trong message html

    <div *ngIf="messageService.messages.length" style="text-align: left;">
      <h4>Message</h4>
      <button class="clear" (click)="messageService.deleteAllMessage()">Delete all message</button>
      <div *ngFor="let message of messageService.messages">{{message}}sdfs</div>
    </div>
8.7 Trong app html
    
    <app-messages></app-messages>
### 9. Routes and RouterOutlet
9.1 Create routing

    ng generate module app-routing --flat --module=app
9.2 Import app routing in app module

    import {AppRoutingModule} from './app-routing.module';
    
    imports: [..., AppRoutingModule, ...],
    
9.3 Config app routing

    import {NgModule} from '@angular/core';
    import {Routes, RouterModule} from '@angular/router';
    import {MovieComponent} from './movie/movie.component';
    import {DashboardComponent} from './dashboard/dashboard.component';
    import { MovieDetailComponent } from './movie-detail/movie-detail.component';
    
    const routes: Routes = [
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'}, // default route
      {path: 'movie', component: MovieComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'detail/:id', component: MovieDetailComponent},
    ];
    
    @NgModule({
      imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    })
    export class AppRoutingModule {}
9.4 Use routing

    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center">
      <h1>
        Welcome to {{ title }}!
      </h1>
      <!-- <app-movie></app-movie>
      <app-messages></app-messages> -->
      <!-- <router-outlet></router-outlet> -->
      <nav>
        <a routerLink="/dashboard">Dashboard</a>
        <a routerLink="/movie">Movie</a>
      </nav>
    </div>
### 10. Dashboard and route default
10.1 Create dasboard component

    ng generate component dashboard
    
10.2 Config dashboard controller

    import {Component, OnInit} from '@angular/core';
    import {Movie} from './../../models/movie';
    import {MovieService} from './../movie.service';
    
    @Component({
      selector: 'app-dashboard',
      templateUrl: './dashboard.component.html',
      styleUrls: ['./dashboard.component.css'],
    })
    export class DashboardComponent implements OnInit {
      movies: Movie[] = [];
    
      constructor(private movieService: MovieService) {}
    
      ngOnInit() {
        this.getMovie();
      }
    
      getMovie(): void {
        this.movieService
          .getMovie()
          .subscribe(movies => (this.movies = movies.slice(1, 5))); // lấy 4 phần tử
      }
    }
10.3 Config html
    
    <h3>Top 4 movie</h3>
    <a *ngFor="let movie of movies" class="col-1-4" style="text-decoration: none;" 
    routerLink="/detail/{{movie.id}}">
      <div class="movie-box">
        <h4>{{movie.name}}</h4>
      </div>
    </a>
    <app-movie-search></app-movie-search>
### 11. Master-Detail component
11.1 Add path in app routing

    {path: 'detail/:id', component: MovieDetailComponent}
11.2 Add routerLink in html list movie

    <a *ngFor="let movie of movies" class="col-1-4" style="text-decoration: none;" 
    routerLink="/detail/{{movie.id}}">
          <div class="movie-box">
            <h4>{{movie.name}}</h4>
          </div>
        </a>
11.3 Config movie detail

    ngOnInit() {
        this.getMovieFromRoute();
      }
    
      getMovieFromRoute(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        console.log(
          `this.route.snapshot.paramMap = ${JSON.stringify(
            this.route.snapshot.paramMap
          )}`
        );
        // Call service to "get movie from id"?
        this.movieService
          .getMovieFromId(id)
          .subscribe(movie => (this.movie = movie));
      }
### 12. HTTP services
12.1 Create json-server
Create folder server
    
    npm install -g json-server
12.2 Create file db.json
    
    {
      "movies": [
        {
          "name": "Tada",
          "releaseYear": "2001",
          "id": 1
        },
        {
          "id": 2,
          "name": "Sunflower ",
          "releaseYear": "1980rểw"
        },
        {
          "id": 3,
          "name": "Thank U, Next",
          "releaseYear": "1970 sạlf"
        },
        {
          "id": 4,
          "name": "Please Me",
          "releaseYear": "1960 2"
        },
        {
          "id": 5,
          "name": "123",
          "releaseYear": 1950
        },
        {
          "id": 6,
          "name": "Sicko Mode",
          "releaseYear": 1940
        },
        {
          "id": 7,
          "name": "Break Up",
          "releaseYear": 1930
        },
        {
          "name": "Sakura",
          "releaseYear": 2003,
          "id": 8
        },
        {
          "name": "sda",
          "releaseYear": 12312,
          "id": 9
        },
        {
          "name": "Good bye my love",
          "releaseYear": "1992",
          "id": 10
        }
      ],
      "comments": [
        {
          "id": 1,
          "body": "some comment",
          "postId": 1
        }
      ],
      "profile": {
        "name": "typicode"
      }
    }
12.3  Run db.json
    
    json-server db.json
    
12.4 Import http service

    // in app module
    import {HttpClientModule} from '@angular/common/http';
    
      imports: [..., HttpClientModule],

    //in movie service
    import {HttpClient, HttpHeaders} from '@angular/common/http';
12.5 Config in movie service

    import {catchError, map, tap} from 'rxjs/operators';
    
    export class MovieService {
    private moviesURL = 'http://localhost:3000/movies';
    
    // pipe result can be get inside
    // tap: success
    // catch Error: fail
    getMovie(): Observable<Movie[]> {
        return this.http.get<Movie[]>(this.moviesURL).pipe(
          tap(receivedMovies =>
            console.log(`receivedMovies = ${JSON.stringify(receivedMovies)}`)
          ),
          catchError(error => of([]))
        );
      }
    
    constructor(
        private http: HttpClient
      ) {}
12.6 Use in dashboard

    import {MovieService} from './../movie.service';
    
    export class DashboardComponent implements OnInit {
      movies: Movie[] = [];
    
      constructor(private movieService: MovieService) {}
    
      ngOnInit() {
        this.getMovie();
      }
    
      getMovie(): void {
        this.movieService
          .getMovie()
          .subscribe(movies => (this.movies = movies.slice(1, 5))); // lấy 4 phần tử
      }
    }
### 13. AsyncPipe (tìm kiếm name)
13.1 Create search component

    ng generate component movie-search
13.2 Config movie service

    searchMovie(typedString: string): Observable<Movie[]> {
        if (!typedString.trim()) {
          return of([]);
        }
        return this.http.get<Movie[]>(`${this.moviesURL}?name_like=${typedString}`).pipe(
          tap(foundedMovie => console.log(`fonded movies = ${JSON.stringify(foundedMovie)}`)),
          catchError(error => of(null))
        );
      }
13.3 Config movie-search component
    
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
13.4 Config movie-search html

    <div id="movies">
      <h4>Movie search</h4>
      <input #searchBox (keyup)="search(searchBox.value)">
      <ul class="movies">
        <li *ngFor="let movie of movies$ | async" class="movieListItem">
          <a routerLink="/detail/{{movie.id}}">{{movie.name}}</a>
        </li>
      </ul>
    </div>
### 14. Template-diven Forms
14.1 Create new project

    ng new templatedrivenforms
    
14.2 Create Employee class

    ng generate class Employee
    
14.3 Create EmployeeForm component

    ng generate component EmployeeForm

14.4 Add properties for employee class

    export class Employee {
        constructor(
            public id: number,
            public name: string,
            public dateOfBirth: Date,
            public alias?: string, // ?: cho phép null
            public jobCategory?: string
        ) {}
    }
14.5 Import FormsModule

    // Form
    import { FormsModule } from '@angular/forms';
    
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
      ],
14.6 Import bootstrap in style.css

    @import url('https://unpkg.com/bootstrap@3.3.7/dist/css/bootstrap.min.css');
14.7 Add fake data in employeeform controller

    export class EmployeeFormComponent implements OnInit {
      submited = false;
      jobCategories = ['technology', 'social', 'sciences', 'doctor'];
      newEmployee = new Employee(
        1,
        'Phuong',
        new Date('March 12, 2019 09:00:00'),
        this.jobCategories[0]
      );
    
      onSubmit() {
        this.submited = true;
      }
    
      constructor() {}
    
      ngOnInit() {}
    }
14.8 Init html

    <div class="container" [hidden]="submitted">
      <h1>Employee information</h1>
      <form #employeeForm="ngForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" name="name" id="name" class="form-control" required [(ngModel)]="newEmployee.name"
            #employeeName="ngModel" #watchState>
          <!-- satate maybe: 
            touched: đã click chuột vào rồi
            dirty: đã thay đổi giá trị rồi
            pristine: kich chuột nhưng không thay đổi gì cả
            valid: thành công
            invalid: không thành công -->
          <br>Current state: {{watchState.className}}
          <div [hidden]="employeeName.valid || employeeName.pristine" class="alert alert-danger">
            Name is required (must not blank)
          </div>
        </div>
        <div class="form-group">
          <label for="dateOfBirth">Date of birth</label>
          <input type="text" name="dateOfBirth" id="dateOfBirth" class="form-control" required [(ngModel)]="newEmployee.dateOfBirth"
            #dateOfBirth="ngModel">
          <br>
          <div [hidden]="dateOfBirth.valid || dateOfBirth.pristine" class="alert alert-danger">
            Date of birth is require (must be not blank)
          </div>
        </div>
        <div class="form-group">
          <label for="alias">Alias</label>
          <input type="text" name="alias" id="alias" class="form-control">
        </div>
        <div class="form-group">
          <label for="jobCategory">Job's category</label>
          <select class="form-control" id="jobCategory" required>
            <option *ngFor="let eachJobCategory of jobCategories" [value]="eachJobCategory">{{eachJobCategory}}</option>
          </select>
        </div>
        <button type="button" class="btn btn-default" (click)="addNewEmployee(); employeeForm.reset()">New Employee</button>
        <button type="submit" class="btn btn-success" [disabled]="employeeForm.form.invalid">Submit</button>
      </form>
    </div>
    <h2 [hidden]="!submitted">Submit done!</h2>
14.9 Init controller:

    import {Component, OnInit} from '@angular/core';
    import {Employee} from './../employee';
    
    @Component({
      selector: 'app-employee-form',
      templateUrl: './employee-form.component.html',
      styleUrls: ['./employee-form.component.css'],
    })
    export class EmployeeFormComponent implements OnInit {
      submitted = false;
      jobCategories = ['Technology', 'Social', 'Sciences', 'Doctor'];
      newEmployee = new Employee(
        1,
        'Phuong',
        new Date('March 12, 2019 09:00:00'),
        this.jobCategories[0]
      );
    
      onSubmit() {
        this.submitted = true;
      }
    
      // Math.floor(Date.now()): get time stamp có milisecond
      addNewEmployee() {
        this.newEmployee = new Employee(
          Math.floor(Date.now()),
          '',
          new Date(),
          '',
          ''
        );
      }
    
      constructor() {}
    
      ngOnInit() {}
    }

### 15. Reactive form and Validators (kiểm tra dữ liệu đầu vào)
15.1 Create new project
15.2 Create component
15.3 Create class model
15.4 Import form library
    
    // FormControl: điều khiển 1 trường input và validate
    // FormGroup: Chứa nhiều form control
    // FormBuilder:
    // Validator:
    import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
15.5 Create fake data
    
    export class User {
        id = 0;
        name = '';
        email = '';
        addresses: Address[];
    }
    
    export class Address {
        street = '';
        city = '';
        state = '';
    }
    
    export const users: User[] = [
        {
            id: 1,
            name: 'Phuong',
            email: 'maithanhphuong.cntt@gmail.com',
            addresses: [
            {street: '111 Abc street', city: 'Ben Tre', state: 'Viet Nam'},
            {street: '222 Abc street', city: 'Da Lat', state: 'Viet Nam'},
            ],
        },
        {
            id: 2,
            name: 'Phuong 2',
            email: 'maithanhphuong2.cntt@gmail.com',
            addresses: [
            {street: '333 Abc street', city: 'Ben Tre', state: 'Viet Nam'},
            ],
        },
        {
            id: 3,
            name: 'Phuong 3',
            email: 'maithanhphuong3.cntt@gmail.com',
            addresses: [],
        },
    ];
    export const states = ['Alaska', 'Colorado', 'Florida', 'Texas'];
15.6 Config controller

    // FormControl: điều khiển 1 trường input và validate
    // FormGroup: Chứa nhiều form control
    // FormBuilder:
    // Validator:
    import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
    import { Component, OnInit } from '@angular/core';
    import { states } from '../data-model';
    
    @Component({
      selector: 'app-user-detail',
      templateUrl: './user-detail.component.html',
      styleUrls: ['./user-detail.component.css']
    })
    export class UserDetailComponent implements OnInit {
      states = states;
      userFormGroup: FormGroup;
    
      constructor(private formBuilder: FormBuilder) {
        this.createForm();
      }
    
      createForm() {
        this.userFormGroup = this.formBuilder.group({
          name: ['Phuong', [Validators.required, Validators.minLength(4)]],
          email: ['', Validators.required],
          addreesses: this.formBuilder.group({
            street: ['', [Validators.required]],
            city: '',
            state: this.states[0]
          })
        });
      }
      ngOnInit() {
      }
    }
15.7 Config html

    <h2>User Detail</h2>
    <h3>
      <i>FormBuilder</i>
    </h3>
    <!-- novalidate: validate folow config in controller -->
    <form [formGroup]="userFormGroup" novalidate>
      <div class="form-group">
        <label class="center-block">Name:
          <input type="text"  class="form-control" formControlName="name">
        </label>
        <label class="center-block">Email:
          <input type="text"  class="form-control" formControlName="email">
        </label>
      </div>
      <div formGroupName="addresses" class="well well-lg">
        <h4>User's addresses</h4>
        <div class="form-group">
          <label class="center-block">Street:
            <input type="text"  class="form-control" formControlName="street">
          </label>
        </div>
        <div class="form-group">
          <label class="center-block">City:
            <input type="text"  class="form-control" formControlName="city">
          </label>
        </div>
        <div class="form-group">
          <label class="center-block">State:
            <select class="form-control" formControlName="state">
              <option *ngFor="let state of states" [value]="state">{{state}}</option>
            </select>
          </label>
        </div>
      </div>
      <!-- | json: convert to json using "pipe" -->
      <p>Form value: {{userFormGroup.value | json}}</p>
      <p>Form status: {{userFormGroup.status | json}}</p>
      <p>Form untouched: {{userFormGroup.untouched | json}}</p>
      <p>Form changed: {{userFormGroup.dirty | json}}</p>
      <button type="submit" class="btn btn-success" [disabled]="userFormGroup.status=='INVALID'">Submit</button>
    </form>
15.8 Import app html
    
    <!--The content below is only a placeholder and can be replaced.-->
    <div class="container">
      <h1>Reactive Form</h1>
      <app-user-detail></app-user-detail>
    </div>
15.9 Import in Reactive form to app module

    imports: [
        ...,
        ReactiveFormsModule
      ],
15.10 Import bootstrap in style.css

    @import url('https://unpkg.com/bootstrap@3.3.7/dist/css/bootstrap.min.css');
    
15.6 Custom email validator:
    import {AbstractControl} from '@angular/forms';
    import {ValidatorFn} from '@angular/forms'; // Interface
    
    export const emailValidator = (): ValidatorFn => {
      return (control: AbstractControl): {[key: string]: string} => {
        const result = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i.test(
          control.value
        );
        console.log(`emailValidator = ${result}`);
        return result === true ? null : {error: 'Wrong email format'};
      };
    };
    
    //use
    ..
    email: ['', [Validators.required, emailValidator()]],
    ..
# Note
--module=app: add vào app module luôn
--flat: khong tạo folder mà đặt vào app
--port 