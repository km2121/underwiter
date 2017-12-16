import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class HomeService {
    private propertiesUrl = '/assets/properties';
    private resourceUrl = '/assets/database';
    constructor(
        private http: Http
    ) {}

    getComponentData() {
        return this.http.get(this.propertiesUrl + '/component.data.json').toPromise().then((response) => {
            return response.json();
        }).catch((error) => {
            return this.handleError(error);
        });
    }

    getUserData() {
        return this.http.get(this.resourceUrl + '/users.json').toPromise().then((response) => {
            return response.json();
        }).catch((err) => {
            return this.handleError(err);
        });
    }

    handleError(error) {
        return Promise.reject(error);
    }
}
