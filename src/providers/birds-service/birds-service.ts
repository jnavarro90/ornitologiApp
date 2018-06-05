import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
/*
  Generated class for the BirdsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BirdsServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello BirdsServiceProvider Provider');
  }

  public getAll(id) {
    return Observable.create(observer => {
      this.http.get('http://dev.contanimacion.com/birds/public/getBirds/' + id)
        .subscribe(
          res => {
            //console.log(res);
            observer.next(res);
            observer.complete();
          },
          err => {
            console.log(err);
          }
        )
    });
  }

  public getOne(id) {
    return this.http.get('http://dev.contanimacion.com/birds/public/getBirdDetails/' + id)
    .do(this.logResponse)
    .map(this.extractData)
    .catch(this.catchError)
  }

  public addSighting(body){
    return Observable.create(observer => {
      this.http.post(
        'http://dev.contanimacion.com/birds/public/addSighting/', body)
        .subscribe(
          res => {
            observer.next(res);
            observer.complete();
          },
          err => {
            console.log(err);
          }
        )
    });
  }

  public addBird(body) {
    return Observable.create(observer => {
      this.http.post(
        'http://dev.contanimacion.com/birds/public/addBird/', body)
        .subscribe(
          res => {
            console.log(res);

            observer.next(res);
            observer.complete();
          },
          err => {
            console.log(err);
          }
        )
    });
  }

  private catchError(error: Response | any){
    console.log(error);
    return Observable.throw(error || "Server error")
  }

  private logResponse(res: Response){
    console.log(res);
  }

  private extractData(res: Response){
    return res;
  }
}
