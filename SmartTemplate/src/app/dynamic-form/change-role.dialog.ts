import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DynamicFormService } from '../service/dynamic-form.service';

@Component({
    selector: 'app-change-role-dialog',
    templateUrl: './change-role.dialog.html',
    styleUrls: [
        './dynamic-form.component.css'
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
            this.model = data;
            for (let i = 0; i < this.model.length; i++) {
                this.usernames.push(this.model[i].participantName);
            }
        });
        this.service.getRoles().subscribe((data: any) => {
            this.roles = data;
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
            for (let j = 0; j < this.model.length; j++) {
                if (this.model[j].participantTypeId === this.roles[i].participantTypeId) {
                    this.model[j].participantTypeName = this.roles[i].participantTypeName;
                }
            }
        }
        console.log(this.model);
        document.getElementById('save-button').click();
    }
}
