import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://286b-196-61-35-158.ngrok-free.app/';

  constructor(private http: HttpClient) {}
  // auth endpoints

  // company endpoints
  createProgram(program: any) {
    return this.http.post(
      `${environment.BaseUrl}/api/programs/create`,
      program
    );
  }

  updateProfile(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/talents/update`, formData);
  }
}
