import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Menu, FieldMetadata} from '../shared';

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

    getMetadata() {
        return this.http.get<FieldMetadata[]>(this.dataUrl + '/field-metadata.json');
    }

    saveUserData(users: User[]) {
        console.log(users);
    }
}
