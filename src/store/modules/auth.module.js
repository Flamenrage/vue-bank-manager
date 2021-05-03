
import axios from 'axios'
import {error} from "@/utils/error";
const TOKEN_KEY = 'jwt-token'

export default {
    namespaced: true,    //глобальные названия, доступные в глобальном храниоище
    state() {
        return {
            token: localStorage.getItem(TOKEN_KEY)
        }
    },
    mutations: {
        setToken(state,token){
            state.token = token
            localStorage.setItem(TOKEN_KEY,token)
        },
        removeToken(state) {
            state.token = null
            localStorage.removeItem(TOKEN_KEY)
        },
    },
    actions: {
        async login({ commit }, payload){
            try {
                const {data} = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`,
                    {...payload, returnSecureToken: true}) //axios возвращает нам объект с ключом data, мы его заносим в
                // константу и спредим наш payload, разрешаем обновлять наш токен, получаем айдшник
                commit('setToken', data.idToken)
            } catch (e) {
                throw new Error(error(e.response.data.error.message))
                console.log(error('Error ', e.response.data.error.message))  //response=>data=>error=>message - иерархия в обратном json ответе от сервера, нужно для сохранения информации
            }
        },
        async logout({ commit }){
            commit('removeToken')
        },
    },
    modules: {
    },
    getters: {
        token(state) {
            return state.token
        },
        isAuthorized(state) {
            return !!state.token //приводим токен к boolean значению
        },
        // isAuthorized(_,getters) {
        //     return !!getters.token // аналогичная запись данного метода, не используем стейт, поэтому _
        // },
    }
}
