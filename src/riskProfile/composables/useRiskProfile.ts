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


const useRiskProfile = () => {

    return {
        // Properties
        formHasError,
        riskLevelProfile,
        formValidation,
    }
}

export default useRiskProfile