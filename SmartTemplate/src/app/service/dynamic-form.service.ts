import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Menu, FieldMetadata} from '../model';
import { Global } from '../shared';

@Injectable()
export class DynamicFormService {
    constructor(
        private http: HttpClient
    ) {}

    /**
     * Get user data
     */
    getUsers(loanParticpantId?: number) {
        return this.http.get<User[]>(Global.RESOURCE_URL + '/populate-form-val.json');
    }

    /**
     * Get menu data
     */
    getMenus(loanParticpantId?: number) {
        return this.http.get<Menu[]>(Global.RESOURCE_URL + '/menu.json');
    }

    /**
     * Get participant data
     */
    getParticipantTypeData() {
        return this.http.get(Global.RESOURCE_URL + '/participantTypeData.json');
    }

    /**
     * Get metadata of fields
     */
    getMetadata(loanParticpantId?: number) {
        return this.http.get<FieldMetadata[]>(Global.RESOURCE_URL + '/field-metadata.json');
    }

    /**
     * Get user roles data
     */
    getRoles() {
        return this.http.get(Global.RESOURCE_URL + '/roles.json');
    }

    /**
     * Save user after change to db
     * @param user User want to save
     */
    saveUserData(user: User) {
        console.log(user);
    }
}
