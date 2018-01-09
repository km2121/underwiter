import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Menu, FieldMetadata} from '../model';

@Injectable()
export class DynamicFormService {
    private dataUrl = '/assets/data';
    constructor(
        private http: HttpClient
    ) {}

    /**
     * Get user data
     */
    getUsers() {
        return this.http.get<User[]>(this.dataUrl + '/populate-form-val.json');
    }

    /**
     * Get menu data
     */
    getMenus() {
        return this.http.get<Menu[]>(this.dataUrl + '/menu.json');
    }

    /**
     * Get participant data
     */
    getParticipantTypeData() {
        return this.http.get(this.dataUrl + '/participantTypeData.json');
    }

    /**
     * Get metadata of fields
     */
    getMetadata() {
        return this.http.get<FieldMetadata[]>(this.dataUrl + '/field-metadata.json');
    }

    /**
     * Get user roles data
     */
    getRoles() {
        return this.http.get(this.dataUrl + '/roles.json');
    }

    /**
     * Save user after change to db
     * @param user User want to save
     */
    saveUserData(user: User) {
        console.log(user);
    }
}
