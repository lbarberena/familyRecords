import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment.prod';

import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { GenericResponseModel } from '../helpers/models/generic-response.model';

import { ErrorService } from './error.service';
import {MedicalRecordsModel} from '../helpers/models/medical-records.model';

@Injectable({
    providedIn: 'root'
})
export class MedicalRecordsService {
    private url = `${environment.apiURL}`;
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

    GET(userId: string, userFamily: string): Observable<any> {
        return this.http.get<any>( `${this.url}/medicalRecord/${userId}/${userFamily}` )
            .pipe(
                retry( 1 ),
                catchError( this.errorService.handleError )
            );
    }

    GetByID( medicalRecordId: string, userId: string, userFamily: string ): Observable<any> {
        return this.http.get<any>(`${this.url}/medicalRecord/${userId}/${userFamily}/${ medicalRecordId }`)
            .pipe(
                retry( 1 ),
                catchError( this.errorService.handleError )
            );
    }

    GetByFamily( family: string, userId: string, userFamily: string ): Observable<any> {
        return this.http.get<any>(`${this.url}/medicalRecord/${userId}/${userFamily}/${ family }`)
            .pipe(
                retry( 1 ),
                catchError( this.errorService.handleError )
            );
    }

    GetMines( userId: string, userFamily: string ): Observable<any> {
        return this.http.get<any>(`${this.url}/medicalRecord/${userId}/${userFamily}/mines`)
            .pipe(
                retry( 1 ),
                catchError( this.errorService.handleError )
            );
    }

    POST( data: MedicalRecordsModel, userId: string, userFamily: string ): Observable<any> {
        this.body = JSON.stringify( data );

        return this.http.post<GenericResponseModel>(`${this.url}/medicalRecord/${userId}/${userFamily}`, this.body, this.httpOptions)
            .pipe(
                retry( 1 ),
                catchError(this.errorService.handleError)
            );
    }

    PUT( medicalRecordId: string, data: any, userId: string, userFamily: string ): Observable<any> {
        this.body = JSON.stringify( data );

        return this.http.put<GenericResponseModel>(`${this.url}/medicalRecord/${userId}/${userFamily}/${medicalRecordId}`,
            this.body, this.httpOptions)
            .pipe(
                retry( 1 ),
                catchError(this.errorService.handleError)
            );
    }

    DELETE( medicalRecordId: string, userId: string, userFamily: string ): Observable<any> {
        return this.http.delete<any>(`${this.url}/medicalRecord/${userId}/${userFamily}/${medicalRecordId}`)
            .pipe(
                retry( 1 ),
                catchError( this.errorService.handleError )
            );
    }

}
