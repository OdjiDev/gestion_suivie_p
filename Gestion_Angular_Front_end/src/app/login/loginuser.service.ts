import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class LoginuserService {
  private baseURL = environment.baseURL+ "login";

  constructor(private httpClient: HttpClient) {}

  loginUser(user: User): Observable<object> {
    console.log(user);

    // Create headers with Content-Type set to application/json
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // Send the POST request with the user data and headers
    return this.httpClient.post<Object>(`${this.baseURL}`, user, { headers });

  }


  getUser(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseURL}/list`);
  }

  // getUserById(id: number): Observable<User>{
  //   return this.httpClient.get<User>(`${this.baseURL}/${id}`);
  // }

  addUser(user: User): Observable<Object>{
    return this.httpClient.post<Object>(`${this.baseURL}`, user);
  }

}










//spring security 6
// private baseUrl = environment.baseURL+ "login";

// constructor(private httpClient: HttpClient) {}

// loginUser(user: User): Observable<object> {
//   console.log(user);

//   // Create headers with Content-Type set to application/json
//   const headers = new HttpHeaders().set('Content-Type', 'application/json');

//   // Send the POST request with the user data and headers
//   return this.httpClient.post(`${this.baseUrl}`, user, { headers });
// }
// }
