import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {

	private heroesUrl = 'http://localhost:3000/api/heroes/';  // URL to web api

  constructor(private http: HttpClient,
  						private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    /*const headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('email', 'xxx@xxx.com').set('secret', '123456')
    .set("Access-Control-Allow-Origin", "*")
    .set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");*/

  	this.log(`Invocación http para ${this.heroesUrl}`);
  	return this.http.get<Hero[]>(this.heroesUrl, {headers :{
      'email': 'xxx@xxx.com',
      'secret': '123456',
    }})
				    .pipe(
				    	tap(heroes => this.log(`fetched heroes ${heroes.length}`)),
				      catchError(this.handleError('getHeroes--', []))
				    );
  }

  getHero(id: string): Observable<Hero> {

  	const url = `${this.heroesUrl}${id}`;
    console.log(`Get hero ${url}`);
	  return this.http.get<Hero>(url, {headers :{
      'email': 'xxx@xxx.com',
      'secret': '123456',
    }}).pipe(
	    tap(_ => console.log(`fetched hero id=${id}`)),
	    catchError(this.handleError<Hero>(`getHero id=${id}`))
	  );
/*  	this.log(`fetched hero id=${id}` );

  	return of(HEROES.find(hero => hero.id === id));*/
  }

  updateHero(hero: Hero): Observable<Hero> {
    const url = `${this.heroesUrl}${hero._id}`;
    console.log(`Hero to update -> ${hero._id}`)
    return this.http.put(url, hero, {headers :{
      'email': 'xxx@xxx.com',
      'secret': '123456',
      'Content-Type' : 'application/json'
    }})
            .pipe(
                tap(_=> this.log(`Updated hero ${hero._id}`)),
                catchError(this.handleError<any>('updateHero'))
              );
  }

  deleteHero(hero: Hero): Observable<Hero> {
    const url = `${this.heroesUrl}${hero._id}`;
      console.log(`Hero to delete -> ${hero._id}`)
      return this.http.delete(url, {headers :{
        'email': 'xxx@xxx.com',
        'secret': '123456',
        'Content-Type' : 'application/json'
      }}).pipe(
          tap(_=> this.log(`deleted hero ${hero._id}`)),
          catchError(this.handleError<any>('updateHero'))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post(this.heroesUrl, hero, {headers :{
        'email': 'xxx@xxx.com',
        'secret': '123456',
        'Content-Type' : 'application/json'
      }})
            .pipe(
                tap(_=> this.log(`Added hero ${hero._id}`)),
                catchError(this.handleError<any>('updateHero'))
              );
  }

  searchHeroes(term: String): Observable<Hero[]> {
    if(!term.trim()){
      return of([])
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}?name=${term}`, {headers :{
      'email': 'xxx@xxx.com',
      'secret': '123456',
    }}).pipe(
              tap(heroes => this.log(`fetched heroes ${heroes.length}`)),
              catchError(this.handleError('getHeroes--', []))
            );
  }


  /** Log a HeroService message with the MessageService */
	private log(message: string) {
    console.log(`HeroService: ${message}`);
	  this.messageService.addMessage(`HeroService: ${message}`);
	}

	/**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
