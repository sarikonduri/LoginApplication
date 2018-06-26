import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) {
  }

  login(loginInfo) {
    if (loginInfo.username === "sari@gmail.com" && loginInfo.password === "test123") {
      return (this.http.get('/assets/loginResponse.json'));
    } else {
      return (this.http.get('/assets/loginResponseError.json'));
    }
  }
}
