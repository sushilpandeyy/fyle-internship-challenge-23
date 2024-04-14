import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Octokit } from 'octokit';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import tokenObject from './token';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private octokit: Octokit;

    constructor(private httpClient: HttpClient) {
        this.octokit = new Octokit({ auth: tokenObject });
    }

    getUser(username: string): Observable<any> {
        const url = `GET /users/${username}`;
        return new Observable(observer => {
            this.octokit.request(url)
                .then(response => {
                    observer.next(response.data);
                    observer.complete();
                })
                .catch(error => observer.error(error));
        }).pipe(
            shareReplay(1)
        );
    }

    getReposForUser(username: string, page: number = 1, perPage: number = 10): Observable<any> {
        const url = `GET /users/${username}/repos?page=${page}&per_page=${perPage}`;
        return new Observable(observer => {
            this.octokit.request(url)
                .then(response => {
                    observer.next(response.data);
                    observer.complete();
                })
                .catch(error => observer.error(error));
        }).pipe(
            shareReplay(1)
        );
    }
}
