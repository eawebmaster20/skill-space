import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterTalent } from '../../../shared/model/register-talent';
import { catchError, Observable, of, throwError } from 'rxjs';
import { ILoginUser } from '../../../shared/model/login.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiurl = 'https://100a-41-215-171-13.ngrok-free.app/auth/token';

  constructor(private http: HttpClient) {}

  login(user:ILoginUser): Observable<ILoginUser>{
    return this.http.post<ILoginUser>(`${this.apiurl}`, user)
    .pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
