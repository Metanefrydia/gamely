import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  UserDetails,
  TokenPayload
} from './authentication.models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token;

  public constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('auth-token')) {
      this.token = localStorage.getItem('auth-token');
    }
  }

  public editProfile(_id: string, name: string, birthYear: number, games: any, image: File, email: string, description: string): Observable<any> {
    const profileData = new FormData();
    profileData.append("_id", _id);
    profileData.append("name", name);
    profileData.append("birthYear", birthYear.toString());
    profileData.append("games",  JSON.stringify(games));
    profileData.append("email", email);
    profileData.append("description", description)
    if (image) {
      profileData.append("image", image);
    }
    return this.http.post<{ profile: any }>('/api/edit-profile', profileData);
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public getProfile(userName: string): Observable<any> {
    return this.http.get(`/api/profile/${userName}`);
  }

  public getProfileById(id: string): Observable<any> {
    return this.http.get(`/api/profile-id/${id}`)
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('auth-token');
    this.router.navigateByUrl('/');
  }

  public getUserDetails(): UserDetails | null {
    const token = this.getToken();
    let payload;
    if (token !== undefined && token !== null) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public getUserId(): string {
    return this.getUserDetails()._id;
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private saveToken(token: string): void {
    localStorage.setItem('auth-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (this.token !== undefined && this.token !== null) {
      this.token = localStorage.getItem('auth-token');
    }
    return this.token;
  }

  private request(
    method: 'post' | 'get',
    type: 'login' | 'register',
    user?: TokenPayload
  ): Observable<any> {
    let base$;

    if (method === 'post') {
      base$ = this.http.post(`/api/${type}`, user);
    } else {
      base$ = this.http.get(`/api/${type}`, {
        headers: { authorization: `Bearer ${this.getToken()}` }
      });
    }

    const request = base$.pipe(
      map((data: any) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }
}
