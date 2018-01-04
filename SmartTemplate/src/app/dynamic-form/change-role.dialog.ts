import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DynamicFormService } from '../service/dynamic-form.service';

@Component({
    selector: 'app-change-role-dialog',
    templateUrl: './change-role.dialog.html',
    styleUrls: [
        './dynamic-form.component.scss'
    ]
})

export class ChangeRoleDialog implements OnInit {

    roles: Array<any>;
    usernames: string[];
    model: Array<any>;
    constructor(
        private dialogRef: MatDialogRef<ChangeRoleDialog>,
        private service: DynamicFormService
    ) {
    }

    ngOnInit() {
        this.usernames = [];
        this.service.getParticipantTypeData().subscribe((data: any) => {
            this.roles = data.slice();
            this.model = data.slice();
            for (let i = 0; i < this.roles.length; i++) {
                this.usernames.push(this.roles[i].participantName);
            }
        });
    }

    /**
     * Click Cancel button
     */
    onNoClick(): void {
        this.dialogRef.close();
    }

    /**
     * Click Save button
     */
    saveData() {
        for (let i = 0; i < this.roles.length; i++) {
            this.roles[i].participantTypeId = this.model[i].participantTypeId;
            this.roles[i].participantTypeName = this.model[i].participantTypeName;
        }
        console.log(this.roles);
        document.getElementById('save-button').click();
    }
}
