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
    firstName: Function;
    secondName: Function;
    firstSurname: Function;
    secondSurname: Function;
    gender: Function;
    countryBirth: Function;
    countryResidence: Function;
    profession: Function;
    age: Function;
    incomeLevel: Function;
    ppe: Function;
}