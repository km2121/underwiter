import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-custom-material',
    templateUrl: './custom-material.component.html'
})

export class CustomMaterialComponent implements OnInit {
    @Input() type: string;
    @Input() model: any;
    @Input() isDisable: boolean;
    @Input() isRequire: boolean;
    @Input() placeholder: string;
    isInput: boolean;
    isDropdown: boolean;
    isDropdownMultiple: boolean;
    isDatepicker: boolean;
    isRadioGroup: boolean;
    isTextArea: boolean;
    constructor() {
    }

    ngOnInit() {
        switch (this.type) {
            case 'textBox': {
                this.isInput = true;
                break;
            }
            case 'datepicker': {
                this.isDatepicker = true;
                break;
            }
            case 'dropdownBox': {
                this.isDropdown = true;
                break;
            }
            case 'multiSelectBox': {
                this.isDropdownMultiple = true;
                break;
            }
            case 'radioBox': {
                this.isRadioGroup = true;
                break;
            }
            case 'textarea': {
                this.isTextArea = true;
                break;
            }
        }
    }
}
