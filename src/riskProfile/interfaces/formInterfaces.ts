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
    age: (value: string) => number | undefined;
    incomeLevel: (value: string) => number | undefined;
    ppe: (value: string) => number;
    firstName?: (value: string) => number; // Agregar la propiedad 'firstName' al objeto
}