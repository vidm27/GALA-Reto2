export interface Result {
    totalPoint: number;
    isActivateHighRisk: boolean;
}

export interface Form {
    firstName: Input;
    secondName: Input;
    firstSurname: Input;
    secondSurname: Input;
    gender: Input;
    countryBirth: Input;
    countryResidence: Input;
    profession: Input;
    age: Input;
    incomeLevel: Input;
    ppe: Input;
}
export interface Input {
    isRequired: boolean;
    value: string;
    caption: string;
    isError: boolean;
}

export interface Point {
    countryBirth: (value: string) => number;
    countryResidence: (value: string) => number;
    profession: (value: string) => number;
    age: (value: string) => number;
    incomeLevel: (value: string) => number;
    ppe: (value: string) => number;
}