import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, delay, map, Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { ComplexFormValue } from "../models/complex-form-value.model";

@Injectable()
export class ComplexFormService {

    constructor(private httpClient: HttpClient) {}

    saveUserInfo(formValue: ComplexFormValue): Observable<boolean> {
        return this.httpClient.post(`${environment.apiUrl}/users`, formValue).pipe(
            map(() => true),
            delay(1000),
            catchError(() => of(false).pipe(
                delay(1000)
            ))
        );
    }
}