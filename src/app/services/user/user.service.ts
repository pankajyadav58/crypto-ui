import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class UserService {

  constructor (
    private http: Http
  ) {}

  login(data:Object) {
    const headers = new Headers({'Access-Control-Allow-Origin': '*'}); // ... Set content type to JSON 
    const options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.post("http://localhost:8080/api/v1" + "/auth/login", data, options)
    .map((res:Response) => res.json());
  }

}