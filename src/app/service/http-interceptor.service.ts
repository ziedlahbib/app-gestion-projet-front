import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor(private authenticationService: AuthServiceService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let token=localStorage.getItem('autorisation');
      if (request.url.includes('/api/django/')) {
        // Do not add the bearer token for Django API requests
        return next.handle(request);
      }
  
      // Add the bearer token for other requests
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
  
      return next.handle(request);
    }


  }

