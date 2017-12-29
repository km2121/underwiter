import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

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
    result: Array<any>;
    constructor(
        private dialogRef: MatDialogRef<ChangeRoleDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    ngOnInit() {
        this.usernames = [];
        this.roles = this.data.slice();
        this.result = this.data.slice();
        for (let i = 0; i < this.roles.length; i++) {
            this.usernames.push(this.roles[i].participantName);
        }
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
        for (let i = 0; i < this.result.length; i++) {
            this.result[i].participantName = this.usernames[i];
        }
        document.getElementById('save-button').click();
    }
}
