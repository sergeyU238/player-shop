import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { User } from '../../../entities/user/model/user';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import type { AuthLoginDto } from '../dto/auth-login';

@Injectable({
  providedIn: 'root',
})
export class AuthData {
  private readonly baseUrl = `${environment.API_URL}/auth`;
  private readonly http = inject(HttpClient);

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/authenticate`);
  }

  public login(data: AuthLoginDto): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/login`, data);
  }
}
