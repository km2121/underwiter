export interface UserData {
    category?: string;
    fieldName?: string;
    fieldValue?: string;
    controlType?: string;
    maxLength?: string;
    enable?: boolean;
    show?: boolean;
    required?: boolean;
}

export interface User {
    userId: number;
    participantType: number;
    data: UserData[];
}
