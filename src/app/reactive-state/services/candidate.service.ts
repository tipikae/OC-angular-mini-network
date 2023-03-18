import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, delay, map, Observable, switchMap, take, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { Candidate } from "../models/candidate.model";

@Injectable()
export class CandidateService {

    private _loading$ = new BehaviorSubject<boolean>(false);
    get loading$(): Observable<boolean> {
        return this._loading$.asObservable();
    }

    private _candidates$ = new BehaviorSubject<Candidate[]>([]);
    get candidates$(): Observable<Candidate[]> {
        return this._candidates$.asObservable();
    }

    private lastCandidateLoad = 0;

    constructor(private httpClient: HttpClient) {}

    getCandidatesFromServer() {
        if (Date.now() - this.lastCandidateLoad <= 300000) {
            return;
        }

        this.setLoadingStatus(true);
        this.httpClient.get<Candidate[]>(`${environment.apiUrl}/candidates`).pipe(
            delay(1000),
            tap(candidates => {
                this.lastCandidateLoad = Date.now();
                this.setLoadingStatus(false);
                this._candidates$.next(candidates);
            })
        ).subscribe();
    }

    getCandidateById(id: number): Observable<Candidate> {
        if (!this.lastCandidateLoad) {
            this.getCandidatesFromServer();
        }
        return this.candidates$.pipe(
            map(candidates => candidates.filter(candidate => candidate.id === id)[0])
        );
    }

    // Modification pessimiste
    refuseCandidat(id: number): void {
        this.setLoadingStatus(true);
        this.httpClient.delete(`${environment.apiUrl}/candidates/${id}`).pipe(
            delay(1000),
            switchMap(() => this.candidates$),
            take(1),
            map(candidates => candidates.filter(candidat => candidat.id !== id)),
            tap(candidates => {
                this._candidates$.next(candidates);
                this.setLoadingStatus(false);
            })
        ).subscribe();
    }

    // Modification optimiste
    hireCandidat(id: number): void {
        this.candidates$.pipe(
            take(1),
            map(candidates => candidates
                .map(candidate => candidate.id === id ? 
                    { ...candidate, company: 'SnapFace Ltd' } :
                    candidate
                )),
            tap(updatedCandidates => this._candidates$.next(updatedCandidates)),
            delay(1000),
            switchMap(updatedCandidates => this.httpClient.patch(
                `${environment.apiUrl}/candidates/${id}`,
                updatedCandidates.find(candidate => candidate.id === id)))
        ).subscribe();
    }

    private setLoadingStatus(loading: boolean) {
        this._loading$.next(loading);
    }
}