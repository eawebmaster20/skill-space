import { Injectable } from '@angular/core';
import {
  ICompanyRegistrationForm,
  RegisterTalent,
} from '../../shared/model/register-talent';
import { AuthRegisterService } from '../Auth/register/auth-register.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private userDataSubject = new BehaviorSubject<RegisterTalent | null>(null);
  userData$ = new BehaviorSubject<
    RegisterTalent | ICompanyRegistrationForm | null
  >(null);

  constructor() {}

  setUserData(user: RegisterTalent | ICompanyRegistrationForm): void {
    this.userDataSubject.next(user);
    this.userData$.next(user);
    console.log(this.userData$.getValue());
  }

  getUserData(): RegisterTalent | null {
    return this.userDataSubject.getValue();
  }
}
