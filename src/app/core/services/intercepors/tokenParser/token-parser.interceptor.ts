import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { LocalstorageService } from '../../localStorage/localstorage.service';
import { jwtDecode } from "jwt-decode";

export const tokenParserInterceptor: HttpInterceptorFn = (req, next) => {
  let LStorage = inject(LocalstorageService)
  return next(req.clone({
    headers: req.headers.append('X-Authentication-Token', LStorage.getItem('token')),
  })).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          console.log('Response body:', event.body);
          console.log('Response headers:', event.headers);
        }
      },
      error: (err) => {
        console.error('Error in response:', err);
      },
    })
  );
};