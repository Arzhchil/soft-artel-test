import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticated = false;
  private currentUser: any = null;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.loadingSubject.asObservable();
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.restoreSession();
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<any[]>('http://localhost:3000/users').pipe(
      map((users) => {
        const user = users.find(
          (u) => u.username === username && u.password === password
        );
        if (user) {
          this.authenticated = true;
          this.currentUser = user;

          this.storageService.setItem('currentUser', JSON.stringify(user));
          return true;
        } else {
          this.authenticated = false;
          this.currentUser = null;
          return false;
        }
      }),
      catchError((error) => {
        console.error('Ошибка авторизации:', error);
        return of(false);
      })
    );
  }

  logout(): void {
    this.authenticated = false;
    this.currentUser = null;
    this.storageService.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }

  private restoreSession(): void {
    const storedUser = this.storageService.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      this.authenticated = true;
    } else {
      this.currentUser = null;
      this.authenticated = false;
    }
  }

  loadCurrentUser(): void {
    this.loadingSubject.next(true);
    const storedUser = this.storageService.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      this.authenticated = true;
    } else {
      this.currentUser = null;
      this.authenticated = false;
    }
    this.loadingSubject.next(false);
  }
}
