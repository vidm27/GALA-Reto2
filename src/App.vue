<script setup lang="ts">
import { reactive } from 'vue';

const formValidation = reactive({
  firstName: {
    isRequired: true,
    value: "",
    caption: "Se require ingresar el primer nombre"
  },
  secondName: {
    isRequired: false,
    value: "",
    caption: ""
  },
  firstSurname: {
    isRequired: true,
    value: "",
    caption: "Se require ingresar el segundo nombre"
  },
  secondSurname: {
    isRequired: true,
    value: "",
    caption: "Se require ingresar el segundo nombre"
  },
  gender: {
    isRequired: true,
    value: "",
    caption: "Se requiere seleccionar el genero"
  },
  countryBirth: {
    isRequired: true,
    value: "",
    caption: "Se requiere seleccionar un pais"
  },
  countryResidence: {
    isRequired: true,
    value: "",
    caption: "Se requiere seleccionar un pais"
  },
  profession: {
    isRequired: true,
    value: "",
    caption: "Se requiere escoger una profession"
  },
  age: {
    isRequired: true,
    value: "",
    caption: "Se require seleccionar un rango de edad"
  },
  incomeLevel: {
    isRequired: true,
    value: "",
    caption: "Se require seleccionar un rango de ingresos"
  },
  ppe: {
    isRequired: true,
    value: "",
    caption: "se require selecionar una opcion"
  }
})



function evaluateRiskProfile() {
  // const result = calculateRiskOfProfile();
  // console.log(result)
  // const risk = checkLevelRisk(result);
  // console.log(`El nivel de riesgo de este cliente es: ${risk}`);
}
</script>

<template>
  <section class="mx-auto w-6/12 my-6">
    <form class="grid gap-2 md:grid-cols-1 shadow-lg px-4 py-3 rounded-md">
      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900">Primer nombre</label>
        <input type="text" name="firstName" id="firstName" v-model="formValidation.firstName.value"
          class="bg-gray-50 border border-gray-300 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 p-1.5 w-full">
      </div>
      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900">Segundo nombre</label>
        <input type="text" name="middleName" id="middleName" v-model="formValidation.secondName.value"
          class="bg-gray-50 border border-gray-300 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 p-1.5 w-full">
      </div>
      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900" for="firstSurname">Primer Apellido</label>
        <input type="text" name="firstSurname" id="firstSurname" v-model="formValidation.firstSurname.value"
          class="bg-gray-50 border border-gray-300 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 p-1.5 w-full">
      </div>
      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900" for="secondSurname">Segundo Apellido</label>
        <input type="text" name="secondSurname" id="secondSurname" v-model="formValidation.secondSurname.value"
          class="bg-gray-50 border border-gray-300 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 p-1.5 w-full">
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
      </div>
      <div>
        <label class="mb-2 text-sm font-medium text-gray-900" for="age">Edad</label>
        <div>
          <input class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" type="radio" name="age" id="age" value="lower_25"
            v-model="formValidation.age.value">
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
      </div>
      <div>
        <label class="mb-2 text-sm font-medium text-gray-900" for="incomeLevel">Nivel de ingreso</label>
        <div>
          <input class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" type="radio" name="incomeLevel" id="incomeLevel"
            value="lower_20k" v-model="formValidation.incomeLevel.value">
          <label class="mb-2 text-sm font-medium text-gray-900" for="lower20k">Menos 20K</label>
        </div>
        <div>
          <input class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" type="radio" name="incomeLevel" id="incomeLevel"
            value="between_20k_75k" v-model="formValidation.incomeLevel.value">
          <label class="mb-2 text-sm font-medium text-gray-900" for="between_20k_75k">Entre 20k y 75k</label>
        </div>
        <div>
          <input class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" type="radio" name="incomeLevel" id="incomeLevel"
            value="bigger_75k" v-model="formValidation.incomeLevel.value">
          <label class="mb-2 text-sm font-medium text-gray-900" for="bigger_75k">Mayor 75K</label>
        </div>
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
    </div>
    <div>
      <button type="button" id="btnRiskProfile" @click="evaluateRiskProfile"
        class="text-white bg-green-700 px-4 py-2 rounded-md outline-none hover:bg-green-900 ">Evaluar perfil de
        riesgo</button>
    </div>
    </form>
  </section>
</template>

<style scoped></style>
