import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class HomeService {
    private resourceUrl = '/assets/properties/component.data.json';
    constructor(
        private http: Http
    ) {}

    getComponentData() {
        return this.http.get(this.resourceUrl).toPromise().then((response) => {
            return response.json();
        }).catch((error) => {
            return this.handleError(error);
        });
    }

    handleError(error) {
        return Promise.reject(error);
    }
}
