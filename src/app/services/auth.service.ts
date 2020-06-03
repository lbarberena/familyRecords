import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { tap, retry, catchError } from 'rxjs/operators';

import { AuthResponseModel } from '../helpers/models/auth-response.model';
import { AuthModel } from '../helpers/models/auth.model';
import { GenericResponseModel } from '../helpers/models/generic-response.model';
import { RegisterModel } from '../helpers/models/registers.model';

import { ErrorService } from './error.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private url = `${environment.apiURL}/user`;
    private body: any;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST',
            'Access-Control-Allow-Headers': 'X-Requested-With'
        })
    };

    constructor( private http: HttpClient, private errorService: ErrorService ) { }

    Login(user: AuthModel): Observable<AuthResponseModel> {
        return this.http.post<AuthResponseModel>(`${this.url}/login`, user)
            .pipe(
                tap(
                    (res: AuthResponseModel) => {
                        if ( res ) {
                            return res;
                        }
                    }
                )
            );
    }

    Register( user: RegisterModel ): Observable<any> {
        this.body = user;
        return this.http.post<GenericResponseModel>(`${this.url}/register`, this.body, this.httpOptions).pipe(
            retry(1),
            catchError(this.errorService.handleError)
        );
    }

    RequestChangePassword( user: any ): Observable<any> {
        return this.http.put<GenericResponseModel>(`${this.url}/password`, user).pipe(
            retry( 1 ),
            catchError( this.errorService.handleError )
        );
    }

    ChangePasswordWhileLoggedIn( user: any, userId: string, userFamily: string ): Observable<any> {
        return this.http.put<GenericResponseModel>(`${this.url}/password/${userId}/${userFamily}`, user).pipe(
            retry( 1 ),
            catchError( this.errorService.handleError )
        );
    }

    ConfirmUser( user: any ): Observable<any> {
        return this.http.post<GenericResponseModel>(`${this.url}/user`, user).pipe(
            retry( 1 ),
            catchError( this.errorService.handleError )
        );
    }

    GET(userId: string, userFamily: string): Observable<any> {
        return this.http.get<GenericResponseModel>( `${this.url}/users/${userId}/${userFamily}` )
            .pipe(
                retry( 1 ),
                catchError( this.errorService.handleError )
            );
    }

    GetUsersInFamily(userId: string, userFamily: string, family: string): Observable<any> {
        return this.http.get<GenericResponseModel>( `${this.url}/users/${userId}/${userFamily}/${family}` )
            .pipe(
                retry( 1 ),
                catchError( this.errorService.handleError )
            );
    }

    GetById( idUser: string, userId: string, userFamily: string ): Observable<any> {
        return this.http.get<GenericResponseModel>(`${this.url}/users/${userId}/${userFamily}/${ idUser }`)
            .pipe(
                retry( 1 ),
                catchError( this.errorService.handleError )
            );
    }

    PUT( userId: string, data: any ): Observable<any> {
        this.body = JSON.stringify( data );

        return this.http.put<GenericResponseModel>(`${this.url}/users/${ userId }`, this.body, this.httpOptions)
            .pipe(
                retry( 1 ),
                catchError(this.errorService.handleError)
            );
    }

    DELETE( idUser ): Observable<any> {
        return this.http.delete<GenericResponseModel>(`${this.url}/users/${ idUser }`)
            .pipe(
                retry( 1 ),
                catchError( this.errorService.handleError )
            );
    }

}
