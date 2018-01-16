import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DynamicFormService } from '../service/dynamic-form.service';

@Component({
    selector: 'app-save-conform-dialog',
    templateUrl: './save-confirm.dialog.html',
    styleUrls: [
        './dynamic-form.component.css'
    ]
})

export class SaveConfirmDialog implements OnInit {
    constructor(
        private dialogRef: MatDialogRef<SaveConfirmDialog>
    ) {
    }

    ngOnInit() {
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
    }
}
