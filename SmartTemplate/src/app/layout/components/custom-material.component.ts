import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, Validators } from '@angular/forms';
import { ComponentConstant, ComponentValidation, RegexPattern } from '../../shared';
import { FormArray } from '@angular/forms/src/model';

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

/**
 * This component will render an Angular Material component base on attribute "type" from @Input decorator
 */
export class CustomMaterialComponent implements OnInit, ControlValueAccessor {
    @Input() type: string;
    @Input() isDisable: boolean;
    @Input() isRequire: boolean;
    @Input() placeholder: string;
    @Input() metadata: any;
    @Input() validate: string;
    @Input() maxLength: string;
    isInput: boolean;
    isDropdown: boolean;
    isDropdownMultiple: boolean;
    isDatepicker: boolean;
    isRadioGroup: boolean;
    isTextArea: boolean;
    isCheckBox: boolean;
    formControl: FormControl;
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;
    private innerValue: any = null;
    constructor() {
    }

    ngOnInit() {
        // Check type and select component type to render
        this.handleValidate();
        this.handleComponentType();
    }

    handleComponentType() {
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
            case ComponentConstant.CHECK_BOX: {
                this.isCheckBox = true;
                break;
            }
        }
    }

    handleValidate() {
        switch (this.validate) {
            case ComponentValidation.TEXT: {
                this.formControl = new FormControl({value: '', disabled: this.isDisable }, [
                    Validators.minLength(3)
                ]);
                break;
            }
            case ComponentValidation.TEL: {
                this.formControl = new FormControl({value: '', disabled: this.isDisable }, [
                    Validators.pattern(RegexPattern.NUMBER)
                ]);
                break;
            }
            case ComponentValidation.EMAIL: {
                this.formControl = new FormControl({value: '', disabled: this.isDisable }, [
                    Validators.email
                ]);
                break;
            }
            case ComponentValidation.NUMBER: {
                this.formControl = new FormControl({value: '', disabled: this.isDisable }, [
                    Validators.pattern(RegexPattern.NUMBER)
                ]);
                break;
            }
            case ComponentValidation.CURRENCY: {
                this.formControl = new FormControl({value: '', disabled: this.isDisable }, []);
                break;
            }
            default: {
                this.formControl = new FormControl();
            }
        }
    }

    /**
     * Getter data
     */
    get value(): any {
        return this.innerValue;
    }

    /**
     * Setter data
     */
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    // These functions bellow control passing data of ngModel directive

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

    isChecked(data) {
        if (this.isCheckBox && this.value !== null && this.value.length > 0) {
            for (let i = 0; i < this.value.length; i++) {
                if (this.value[i] === data.key) {
                    return true;
                }
            }
            return false;
        }
    }

    changeChecked(data) {
        for (let i = 0; i < this.value.length; i++) {
            if (this.value[i] === data.key) {
                this.value.splice(i, 1);
                return;
            }
        }
        this.value.push(data.key);
        console.log(this.value);
    }

    showChangeData() {
        console.log(this.value);
    }
}
