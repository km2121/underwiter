import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomMaterialComponent),
    multi: true
};

@Component({
    selector: 'app-custom-material',
    templateUrl: './custom-material.component.html',
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})

export class CustomMaterialComponent implements OnInit, ControlValueAccessor {
    @Input() type: string;
    // @Input() model: any;
    @Input() isDisable: boolean;
    @Input() isRequire: boolean;
    @Input() placeholder: string;
    @Input() metadata: any;
    isInput: boolean;
    isDropdown: boolean;
    isDropdownMultiple: boolean;
    isDatepicker: boolean;
    isRadioGroup: boolean;
    isTextArea: boolean;
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;
    private innerValue: any = null;
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

    get value(): any {
        return this.innerValue;
    }

    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }


}
