<script setup lang="ts">
import { reactive, ref } from 'vue';

interface Result {
  totalPoint: number;
  isActivateHighRisk: boolean;
}

interface Form {
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
interface Input {
  isRequired: boolean;
  value: string;
  caption: string;
  isError: boolean;
}

interface Point {
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

const formHasError = ref(false);
const riskLevelProfile = ref("");

const pointsByProperty = {
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

function calculateRiskOfProfile() {
  const inputsIgnore = ['firstName', 'secondName', 'firstSurname', 'secondSurname', 'gender'];
  let total = 0;
  let isActiveHighRisk = false;
  for (const key in formValidation) {
    if (inputsIgnore.includes(key)) continue;

    const castKey = key as keyof Form;
    const currentValue = formValidation[castKey].value;
    const castKeyFunction = key as keyof Point
    if (key === "ppe") {
      isActiveHighRisk = currentValue === "no" ? false : true;
    }
    total += pointsByProperty[castKeyFunction](currentValue)

  }
  return { 'totalPoint': total, 'isActivateHighRisk': isActiveHighRisk }
}

function hidePreviewDialog(dialog: HTMLDialogElement) {
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const isClickHeightBackdrop = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height)
    const isClickWidthBackdrop = (rect.left <= event.clientX && event.clientX <= rect.left + rect.width)
    const isClickBackdrop = isClickHeightBackdrop && isClickWidthBackdrop
    if (!isClickBackdrop) {
      dialog.close()
    }
  })
}

function showPreviewDialog() {
  const dialog: HTMLDialogElement = document.getElementById("preview") as HTMLDialogElement;
  dialog.classList.add("active-dialog");
  dialog.showModal()
  hidePreviewDialog(dialog);
}


function checkLevelRisk(result: Result) {
  if (result.isActivateHighRisk === true) {
    return "Alto"
  }
  if (result.totalPoint > 1400) {
    return "Alto"
  }
  if (result.totalPoint > 1200 && result.totalPoint <= 1400) {
    return "Medio"
  }
  if (result.totalPoint <= 1200) {
    return "Bajo"
  }
  return ""
}

function validateInputOfForm() {
  let hasError = false;
  for (const key in formValidation) {
    const castKey = key as keyof Form;
    const currentValue = formValidation[castKey].value.trim();
    const isRequired = formValidation[castKey].isRequired;
    if (currentValue.length === 0 && isRequired) {
      formValidation[castKey].isError = true;
      hasError = true;
    } else {
      formValidation[castKey].isError = false;
    }
  }
  return { hasError }
}

function evaluateRiskProfile() {
  const resultValidate = validateInputOfForm()
  if (resultValidate.hasError) {
    formHasError.value = true
    return;
  }
  formHasError.value = false;
  const result = calculateRiskOfProfile();
  console.log(result)
  const risk = checkLevelRisk(result);
  riskLevelProfile.value = risk;
  showPreviewDialog()
  console.log(`El nivel de riesgo de este cliente es: ${risk}`);
}
</script>

<template>
  <section class="mx-auto w-5/12 my-6 max-md:w-10/12">
    <form class="grid gap-2 md:grid-cols-1 shadow-lg px-4 py-3 rounded-md">
      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900">Primer nombre</label>
        <input type="text" name="firstName" id="firstName" v-model="formValidation.firstName.value"
          class="bg-gray-50 border border-gray-300 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 p-1.5 w-full">
        <span v-if="formValidation.firstName.isError" class="text-sm font-bold text-red-700">{{
          formValidation.firstName.caption }}</span>
      </div>
      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900">Segundo nombre</label>
        <input type="text" name="middleName" id="middleName" v-model="formValidation.secondName.value"
          class="bg-gray-50 border border-gray-300 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 p-1.5 w-full">
        <span v-if="formValidation.secondName.isError" class="text-sm font-bold text-red-700">{{
          formValidation.secondName.caption }}</span>
      </div>
      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900" for="firstSurname">Primer Apellido</label>
        <input type="text" name="firstSurname" id="firstSurname" v-model="formValidation.firstSurname.value"
          class="bg-gray-50 border border-gray-300 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 p-1.5 w-full">
        <span v-if="formValidation.firstSurname.isError" class="text-sm font-bold text-red-700">{{
          formValidation.firstSurname.caption }}</span>

      </div>
      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900" for="secondSurname">Segundo Apellido</label>
        <input type="text" name="secondSurname" id="secondSurname" v-model="formValidation.secondSurname.value"
          class="bg-gray-50 border border-gray-300 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 p-1.5 w-full">
        <span v-if="formValidation.secondSurname.isError" class="text-sm font-bold text-red-700">{{
          formValidation.secondSurname.caption }}</span>
      </div>
      <div>
        <label class="mb-2 text-sm font-medium text-gray-900" for="gender">Genero</label>
        <div>
          <input class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" type="radio" name="gender" id="gender"
            value="male" v-model="formValidation.gender.value">
          <label class="mb-2 text-sm font-medium text-gray-900" for="male">Masculino</label>
        </div>
        <div>
          <input class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" type="radio" name="gender" id="gender"
            value="female" v-model="formValidation.gender.value">
          <label class="mb-2 text-sm font-medium text-gray-900" for="female">Femenino</label>
        </div>
        <span v-if="formValidation.gender.isError" class="text-sm font-bold text-red-700">{{ formValidation.gender.caption
        }}</span>

      </div>
      <div>
        <label class="mb-2 text-sm font-medium text-gray-900" for="countryBirth">País de Nacimiento </label>
        <select
          class="bg-gray-50 border border-gray-300 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 p-1.5 w-full"
          name="countryBirth" id="countryBirth" v-model="formValidation.countryBirth.value">
          <option value="" selected disabled>Selecciona un pais</option>
          <option value="panamá">Panamá</option>
          <option value="otro">Otro</option>
        </select>
        <span v-if="formValidation.countryBirth.isError" class="text-sm font-bold text-red-700">{{
          formValidation.countryBirth.caption }}</span>

      </div>
      <div>
        <label class="mb-2 text-sm font-medium text-gray-900" for="countryResidence">País de residencia </label>
        <select
          class="bg-gray-50 border border-gray-300 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 p-1.5 w-full"
          name="countryResidence" id="countryResidence" v-model="formValidation.countryResidence.value">
          <option value="" selected disabled>Selecciona un pais</option>
          <option value="panamá">Panamá</option>
          <option value="otro">Otro</option>
        </select>
        <span v-if="formValidation.countryResidence.isError" class="text-sm font-bold text-red-700">{{
          formValidation.countryResidence.caption }}</span>

      </div>
      <div>
        <label class="mb-2 text-sm font-medium text-gray-900" for="profession">Profesión</label>
        <div>
          <input class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" type="radio" name="profession" id="profession"
            value="abogado" v-model="formValidation.profession.value">
          <label class="mb-2 text-sm font-medium text-gray-900" for="lawyer">Abogado</label>
        </div>
        <div>
          <input class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" type="radio" name="profession" id="profession"
            value="ingeniero" v-model="formValidation.profession.value">
          <label class="mb-2 text-sm font-medium text-gray-900" for="ing">Ingeniero</label>
        </div>
        <div>
          <input class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" type="radio" name="profession" id="profession"
            value="medico" v-model="formValidation.profession.value">
          <label class="mb-2 text-sm font-medium text-gray-900" for="ing">Médico</label>
        </div>
        <div>
          <input class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" type="radio" name="profession" id="profession"
            value="contador" v-model="formValidation.profession.value">
          <label class="mb-2 text-sm font-medium text-gray-900" for="ing">Contador</label>
        </div>
        <div>
          <input class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" type="radio" name="profession" id="profession"
            value="otro" v-model="formValidation.profession.value">
          <label class="mb-2 text-sm font-medium text-gray-900" for="otherProfession">Otro</label>
        </div>
        <span v-if="formValidation.profession.isError" class="text-sm font-bold text-red-700">{{
          formValidation.profession.caption }}</span>

      </div>
      <div>
        <label class="mb-2 text-sm font-medium text-gray-900" for="age">Edad</label>
        <div>
          <input class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" type="radio" name="age" id="age"
            value="lower_25" v-model="formValidation.age.value">
          <label class="mb-2 text-sm font-medium text-gray-900" for="lower_25">Menos 25</label>
        </div>
        <div>
          <input class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" type="radio" name="age" id="age"
            value="between_25_55" v-model="formValidation.age.value">
          <label class="mb-2 text-sm font-medium text-gray-900" for="between_25_55">Entre 25 y 55</label>
        </div>
        <div>
          <input class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" type="radio" name="age" id="age"
            value="bigger_55" v-model="formValidation.age.value">
          <label class="mb-2 text-sm font-medium text-gray-900" for="bigger_55">Mayor a 55</label>
        </div>
        <span v-if="formValidation.age.isError" class="text-sm font-bold text-red-700">{{ formValidation.age.caption
        }}</span>

      </div>
      <div>
        <label class="mb-2 text-sm font-medium text-gray-900" for="incomeLevel">Nivel de ingreso</label>
        <div>
          <input class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" type="radio" name="incomeLevel"
            id="incomeLevel" value="lower_20k" v-model="formValidation.incomeLevel.value">
          <label class="mb-2 text-sm font-medium text-gray-900" for="lower20k">Menos 20K</label>
        </div>
        <div>
          <input class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" type="radio" name="incomeLevel"
            id="incomeLevel" value="between_20k_75k" v-model="formValidation.incomeLevel.value">
          <label class="mb-2 text-sm font-medium text-gray-900" for="between_20k_75k">Entre 20k y 75k</label>
        </div>
        <div>
          <input class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" type="radio" name="incomeLevel"
            id="incomeLevel" value="bigger_75k" v-model="formValidation.incomeLevel.value">
          <label class="mb-2 text-sm font-medium text-gray-900" for="bigger_75k">Mayor 75K</label>
        </div>
        <span v-if="formValidation.incomeLevel.isError" class="text-sm font-bold text-red-700">{{
          formValidation.incomeLevel.caption }}</span>

      </div>
      <div>
        <label class="mb-2 text-sm font-medium text-gray-900" for="ppe">¿Eres una persona políticamente expuestas?</label>
        <div>
          <input class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" type="radio" name="ppe" id="" value="si"
            v-model="formValidation.ppe.value">
          <label class="mb-2 text-sm font-medium text-gray-900" for="si">Sí</label>
        </div>
        <div>
          <input class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" type="radio" name="ppe" id="" value="no"
            v-model="formValidation.ppe.value">
          <label class="mb-2 text-sm font-medium text-gray-900" for="no">No</label>
        </div>
        <span v-if="formValidation.ppe.isError" class="text-sm font-bold text-red-700">{{ formValidation.ppe.caption
        }}</span>
      </div>
      <div>
        <div v-if="formHasError === true" class="p-2.5 bg-gray-50 rounded-md mb-2 border">
          <span class="text-sm font-bold text-red-700">La evaluacion no se puede realizar ya que hay errores en el
            formulario</span>
        </div>
        <button type="button" id="btnRiskProfile" @click="evaluateRiskProfile"
          class="text-white bg-green-700 px-4 py-2 rounded-md outline-none hover:bg-green-900 w-full">Evaluar perfil de
          riesgo</button>
      </div>
    </form>
    <dialog id="preview" class="rounded-md border-2 text-center w-6/12">
      <h1 class="text-3xl font-bold bg-gray-50 rounded-md mb-3 px-1 py-1">Resultado de Evalucion</h1>
      <section class="text-left flex flex-col gap-4  bg-gray-50 py-2 px-3.5 rounded-md mb-4">
        <p>El perfil de este usuario es {{ riskLevelProfile }}</p>
      </section>
    </dialog>
  </section>
</template>

<style scoped>
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}

dialog.active-dialog {
  animation: bounce-in 0.5s;
}

dialog.hide-dialog {
  animation: bounce-in 0.5s reverse;
}

dialog::backdrop {
  background: rgba(231, 231, 231, 0.25);
}</style>
