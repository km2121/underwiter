import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ComponentConstant } from '../../shared';

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
            case ComponentConstant.INPUT: {
                this.isInput = true;
                break;
            }
            case ComponentConstant.DATEPICKER: {
                this.isDatepicker = true;
                break;
            }
            case ComponentConstant.DROPDOWN: {
                this.isDropdown = true;
                break;
            }
            case ComponentConstant.MULTI_SELECT_DROPDOWN: {
                this.isDropdownMultiple = true;
                break;
            }
            case ComponentConstant.RADIO_GROUP: {
                this.isRadioGroup = true;
                break;
            }
            case ComponentConstant.TEXT_AREA: {
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

    onBlur() {
        this.onTouchedCallback();
    }

    writeValue(value: any): void {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }
    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }
}
