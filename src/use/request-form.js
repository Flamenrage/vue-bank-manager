import {useField, useForm} from "vee-validate";
import * as yup from "yup";
//import Swal from 'sweetalert2'


export function useRequestForm(fn) {

    const{handleSubmit, isSubmitting} = useForm({
        initialValues: {
            status: 'active'
        }
    }) //handleSubmit - функция обработки сабмита формы, isSubmitting - функция, позволяющая
    // например дизэйблить кнопку во время обработки запроса
    //submitCount - сколько раз мы сабмитили кнопку
    //хук для конфигурации валиации, 1й параметр - название поля
    //blur - убираем фокус и сразу валидируются данные

    const{value: fio,errorMessage: fError,handleBlur: fBlur} = useField(
        'fio',
        yup.string().trim().required('Пожалуйста введите ФИО')

    )
    const{value: phone,errorMessage: pError,handleBlur: pBlur} = useField(
        'phone',
        yup.string().trim().required('Пожалуйста введите телефон')

    )
    const {value: amount, errorMessage: aError, handleBlur: aBlur} = useField(
        'amount',
        yup.number()
            .required('Введите сумму')
            .min(0, 'Сумма не может быть меньше 0')
    )
    const{value: status} = useField('status')


    const onSubmit = handleSubmit(fn) //функция при срабатывании при нажатии на кнопку
    return{
        fio,
        amount,
        status,
        phone,
        aError,
        fError,
        pError,
        aBlur,
        pBlur,
        fBlur,
        onSubmit,
        isSubmitting,
    }
}
