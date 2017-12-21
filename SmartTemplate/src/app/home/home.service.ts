import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Menu, CountryData, StateData } from '../shared';

@Injectable()
export class HomeService {
    private dataUrl = '/assets/data';
    constructor(
        private http: HttpClient
    ) {}

    getUsers() {
        return this.http.get<User[]>(this.dataUrl + '/populate-form-val.json');
    }

    getMenus() {
        return this.http.get<Menu[]>(this.dataUrl + '/menu.json');
    }

    getParticipantTypeData() {
        return this.http.get(this.dataUrl + '/participantTypeData.json');
    }

    getCountries() {
        return this.http.get<CountryData>(this.dataUrl + '/countryData.json').subscribe((data) => {
            return data;
        }, (error) => {
            return error;
        });
    }

    getStates() {
        return this.http.get<StateData>(this.dataUrl + '/stateData.json').subscribe((data) => {
            return data;
        }, (error) => {
            return error;
        });
    }

    saveUserData(users: User[]) {
        console.log(users);
    }
}
