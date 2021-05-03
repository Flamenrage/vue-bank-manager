<template>
<form class="card" @submit.prevent="onSubmit">
  <h1>Войти в систему</h1>
  <div class="form-control" :class="['form-control', {invalid: eError}]">
    <label for="email"> Email </label>
    <input type="email" id="email" class="type" v-model="email" @blur="eBlur">
    <small v-if="eError">{{eError}}</small>
  </div>
  <div :class="['form-control', {invalid: pError}]">
    <label for="password"> пароль </label>
    <input type="password" id="password" class="type"  v-model="password" @blur="pBlur">
    <small v-if="pError">{{pError}}</small>
  </div>
  <button class="btn primary" type="submit" :disabled="isSubmitting || isTooManyClicks">Войти</button>
  <span class="text-danger" v-if="isTooManyClicks">Вы слишком часто обращаетесь к серверу, остановитесь, прошу!</span>
</form>
</template>

<script>
import {useLoginForm} from "@/use/login-form";
import {useRoute} from "vue-router";
import Swal from 'sweetalert2'
import {error} from "@/utils/error";


export default {


  setup(){
    const route = useRoute()
    if (route.query.message){
      Swal.fire({
        title: 'Ошибка',
        text:error(route.query.message),
        icon: 'error',
        confirmButtonText: 'Хорошо '
      })
    }
    return{...useLoginForm()}
  }
}
</script>

<style scoped>

</style>
