import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterTalent } from '../../../shared/model/register-talent';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthRegisterService {
  private apiUrl = 'https://286b-196-61-35-158.ngrok-free.app/';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  registerTalent(talentData: RegisterTalent): Observable<RegisterTalent> {
    return this.http
      .post<RegisterTalent>(
        `${this.apiUrl}api/users/talent/register`,
        talentData
      )
      .pipe(catchError(this.handleError));
  }

  registerCompany(formData: FormData): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}api/users/company/register`,
      formData
    );
    // .pipe(catchError(this.handleError));
  }

  verifyOtp(email: string, otp: string): Observable<any> {
    const payload = { email, otp };
    return this.http
      .post(`${this.apiUrl}api/users/confirm-otp`, payload, {
        params: { email, otp },
      })
      .pipe(catchError(this.handleError));
  }
}
