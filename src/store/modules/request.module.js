import store from "@/store";
import axios from "@/axios/request";
import {error} from "@/utils/error";

export default{
    namespaced:true,
    state() {
        return {
            requests: []
        }
    },
    mutations: {
        setRequests(state, requests) {
            state.requests = requests
        },
        addRequest(state, request) {
            state.requests.push(request)
        }
    },
    actions: {
        async create({ commit }, payload) {
            try {
                const token = store.getters['auth/token'] //получаем токен из хранилища
                const {data} = await axios.post(`/requests.json?auth=${token}`, payload) //получаем data в качестве ответа после добавления заявки
                commit('addRequest', {...payload, id: data.name}) //создаем новую заявку с id как в БД
            } catch (e) {
                throw new Error(e.response.data.error.message)
            }
        },
        async load({ commit }) {
            try {
                const token = store.getters['auth/token']
                const {data} = await axios.get(`/requests.json?auth=${token}`) //получаем заявку текущего юзера по id и указывая его токен
                const requests = Object.keys(data).map(id => ({...data[id], id}))  // пробегаемся по объекту, вернее по его ключам (у data), потом
                    // потом преобразовываем данные в другой массив с ключом id в связке объекта с data[id], т.е. ключ дата = id и получаем массив
                commit('setRequests', requests)
            } catch (e) {
                throw new Error(e.response.data.error.message)
            }
        },
        async loadOne({ commit }, id) {
            try {
                const token = store.getters['auth/token']
                const {data} = await axios.get(`/requests/${id}.json?auth=${token}`) //получаем заявку текущего юзера по id и указывая его токен
                return data
            } catch (e) {
                throw new Error(e.response.data.error.message)
            }
        },
        async remove(_, id) { //нужен только id для уничтожения заявки
            try {
                const token = store.getters['auth/token']
                await axios.delete(`/requests/${id}.json?auth=${token}`)
            } catch (e) {
                throw new Error(e.response.data.error.message)
            }
        },
        async update(_, request) { //помимо id, нужна целая заявка для обновления полей
            try {
                const token = store.getters['auth/token']
                await axios.put(`/requests/${request.id}.json?auth=${token}`, request)
            } catch (e) {
                throw new Error(e.response.data.error.message)
            }
        }
    },
    getters: {
        requests(state) {
            return state.requests
        }
    }
}
