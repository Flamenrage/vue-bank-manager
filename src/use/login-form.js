import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import {computed} from "vue";
import {watch} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {ref} from "@vue/reactivity";
import Swal from 'sweetalert2'


export function useLoginForm() {

    const store = useStore()
    const router = useRouter()

    const{handleSubmit, isSubmitting, submitCount} = useForm() //handleSubmit - функция обработки сабмита формы, isSubmitting - функция, позволяющая
    // например дизэйблить кнопку во время обработки запроса
    //submitCount - сколько раз мы сабмитили кнопку
    const{value: email,errorMessage: eError,handleBlur: eBlur} = useField(
        'email',
        yup.string().trim().required('Пожалуйста введите почтовый адрес').email('Пожалуйста введите корректный почтовый адрес') //утилита для валидации, строка, обрезанная + обязательная + тип email

    ) //хук для конфигурации валиации, 1й параметр - название поля
    //blur - убираем фокус и сразу валидируются данные

    const MIN_PASSWORD = 10
    const{value: password,errorMessage: pError,handleBlur: pBlur} = useField(
        'password',
        yup.string().trim().required('Пожалуйста введите пароль').min(MIN_PASSWORD, `Пароль должен содержать не менее ${MIN_PASSWORD} символов`)
    )
    const isTooManyClicks = computed(() => submitCount.value >= 3) //было вызвано событие более трех раз, оборачиваем в computed свойство


    watch(isTooManyClicks, val => { //следим за количеством кликов, если функция вернула true, через некоторое время обновляем кнопку
        if (val){
            setTimeout(() => submitCount.value = 0, 1500)
        }
    })

    const onSubmit = handleSubmit(async values => {
        try {
            await store.dispatch('auth/login', values) //асинхронная авторизация
            await router.push('/')
        } catch (e) {
            const message = e.toString().replace("Error: ", "")
            Swal.fire({
                title: 'Ошибка',
                text: message,
                icon: 'error',
                confirmButtonText: 'Хорошо '
            })
        }
    }) //функция при срабатывании при нажатии на кнопку

    return{
        email,
        password,
        eError,
        pError,
        eBlur,
        pBlur,
        onSubmit,
        isSubmitting,
        isTooManyClicks,
    }
}
