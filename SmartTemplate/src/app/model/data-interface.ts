export class UserData {
    menuId?: string;
    fields?: UserFieldData[];
}

export class UserFieldData {
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

export class User {
    loanParticpantId: number;
    participantTypeId: number;
    data: UserData[];
}

export class Menu {
    loanParticpantId?: number;
    participantTypeId?: number;
    data: MenuData[];
}

export class MenuData {
    menuId?: string;
    menuName?: string;
    show?: boolean;
}

export class FieldMetadata {
    fieldId?: number;
    loanParticpantId?: number;
    metadata?: Metadata[];
}

export class Metadata {
    key: string;
    value: string;
}


