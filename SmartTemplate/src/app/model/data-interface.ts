export interface UserData {
    menuId?: string;
    fields?: UserFieldData[];
}

export interface UserFieldData {
    fieldId?: string;
    category?: string;
    fieldName?: string;
    fieldValue?: any;
    controlType?: string;
    maxLength?: string;
    enable?: boolean;
    show?: boolean;
    required?: boolean;
}

export interface User {
    loanParticpantId: number;
    participantTypeId: number;
    data: UserData[];
}

export interface Menu {
    loanParticpantId?: number;
    participantTypeId?: number;
    data: MenuData[];
}

export interface MenuData {
    menuId?: string;
    menuName?: string;
    show?: boolean;
}

export interface FieldMetadata {
    fieldId?: number;
    loanParticpantId?: number;
    metadata?: Metadata[];
}

export interface Metadata {
    key: string;
    value: string;
}


