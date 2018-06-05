import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

export class User {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

@Injectable()
export class AuthServiceProvider {
  currentUser: User;
  id = 'SmF2aWVyTmF2YXJybw==';

  constructor(private http: HttpClient){}

  public login(credentials) {
    if(credentials.user === null || credentials.password === null) {
      return Observable.throw("Por favor introduce las credenciales");
    } else {
      return Observable.create(observer => {
        this.http.post(
          'http://dev.contanimacion.com/birds/public/login/',
          {
            user: credentials.name,
            password: credentials.password
          }).subscribe(
            res => {
              console.log(res);
              if (res['status'] == 'OK') this.currentUser = new User(res['id'], credentials.name);
              this.currentUser.id == this.id ? observer.next(true) : observer.next(false);
              //
              if (this.currentUser) localStorage.setItem('idUser', this.currentUser.id);
              observer.complete();
            },
            err => {
              console.log(err);
            }
          )
      });
    }
  }

  public logout() {
    return Observable.create(observer => {
      localStorage.setItem('idUser', null);
      observer.next(true);
      observer.complete();
    })
  }
}
