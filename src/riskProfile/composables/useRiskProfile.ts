import { ref, reactive } from 'vue'
const formHasError = ref(false);
const riskLevelProfile = ref("");

const formValidation = reactive({
    firstName: {
        isRequired: true,
        value: "",
        caption: "Se require ingresar el primer nombre",
        isError: false
    },
    secondName: {
        isRequired: false,
        value: "",
        caption: "",
        isError: false
    },
    firstSurname: {
        isRequired: true,
        value: "",
        caption: "Se require ingresar el primer apellido",
        isError: false
    },
    secondSurname: {
        isRequired: false,
        value: "",
        caption: "",
        isError: false
    },
    gender: {
        isRequired: true,
        value: "",
        caption: "Se requiere seleccionar el genero",
        isError: false
    },
    countryBirth: {
        isRequired: true,
        value: "",
        caption: "Se requiere seleccionar un pais",
        isError: false
    },
    countryResidence: {
        isRequired: true,
        value: "",
        caption: "Se requiere seleccionar un pais",
        isError: false
    },
    profession: {
        isRequired: true,
        value: "",
        caption: "Se requiere escoger una profession",
        isError: false
    },
    age: {
        isRequired: true,
        value: "",
        caption: "Se require seleccionar un rango de edad",
        isError: false
    },
    incomeLevel: {
        isRequired: true,
        value: "",
        caption: "Se require seleccionar un rango de ingresos",
        isError: false
    },
    ppe: {
        isRequired: true,
        value: "",
        caption: "se require selecionar una opcion",
        isError: false
    }
})


const pointsByProperty: Point = {
    "countryBirth": function (value: string) {
        const weight = 1.10
        return value === "panamá" ? 100 * weight : 200 * weight
    },
    "countryResidence": function (value: string) {
        const weight = 1.10
        return value === "panamá" ? 100 * weight : 200 * weight
    },
    "profession": function (value: string) {
        const weight = 1.20
        if (value === "abogado") {
            return 100 * weight
        }
        if (value === "ingeniero") {
            return 200 * weight
        }
        if (value === "medico") {
            return 300 * weight
        }
        if (value === "contador") {
            return 400 * weight
        }
        return 500 * weight
    },
    "age": function (value: string) {
        const weight = 1.10
        if (value === "lower_25") {
            return 100 * weight
        }
        if (value === "between_25_55") {
            return 200 * weight
        }
        if (value === "bigger_55") {
            return 300 * weight
        }
    },
    "incomeLevel": function (value: string) {
        const weight = 1.20
        if (value === "lower_20k") {
            return 100 * weight
        }
        if (value === "between_20k_75k") {
            return 200 * weight
        }
        if (value === "bigger_75k") {
            return 300 * weight
        }
    },
    "ppe": function (value: string) {
        const weight = 1.20
        return value === "no" ? 100 * weight : 200 * weight
    },
}



const useRiskProfile = () => {

    return {
        // Properties
        formHasError,
        riskLevelProfile,
        formValidation,
        pointsByProperty
    }
}

export default useRiskProfile