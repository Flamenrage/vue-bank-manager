<template>
  <app-loader v-if="loading"></app-loader>
  <app-page back title="Заявка" v-else-if="task">
    <p><strong>Имя владельца</strong>: {{ task.fio }}</p>
    <p><strong>Телефон</strong>: {{ task.phone }}</p>
    <p><strong>Сумма</strong>: {{ task.amount }} <strong>рублей</strong></p>
    <p><strong>Статус</strong>:
      <app-status :type="task.status"/>
    </p>
    <div class="form-control">
      <label for="status">Обновить статус</label>
      <select id="status" v-model="status">
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>
    <button class="btn primary" @click="update" v-if="hasChanges">Обновить</button>
    <button class="btn danger" @click="remove">Удалить</button>

  </app-page>
  <h3 v-else class="text-center text-danger">Такой заявки с id {{ id }} не существует</h3>
</template>

<script>
import AppPage from "@/components/ui/AppPage";
import RequestTable from '../components/requests/RequestTable'
import {ref} from 'vue'
import AppModal from "@/components/ui/AppModal";
import {computed} from "vue";
import {useStore} from "vuex";
import AppLoader from "@/components/ui/AppLoader";
import {useRoute, useRouter} from "vue-router";
import {onMounted} from "vue";
import AppStatus from "@/components/ui/AppStatus";
import Swal from "sweetalert2";
import {error} from "@/utils/error";



export default {
  setup() {
    const loading = ref(true)
    const modal = ref(false)
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const status = ref()
    const task = ref({})
    onMounted(async () => {
      try {
        loading.value = true
        task.value = await store.dispatch('request/loadOne', route.params.id)
        status.value = task.value?.status
        loading.value = false
        console.log(task.value)
      } catch (e) {
      }
    })
    const hasChanges = computed(() => task.value.status !== status.value)

    const remove = async () => {
      try {
        await store.dispatch('request/remove', route.params.id)
        Swal.fire({
          title: 'Заявка удалена',
          icon: 'success',
          confirmButtonText: 'Ок',
          onClose: () => router.push('/')
        })
      } catch (e) {
        Swal.fire({
          title: 'Не удалось удалить заявку',
          text:error(route.query.message),
          icon: 'error',
          confirmButtonText: 'Ок'
        })
      }
    }

   const update = async () => {
      try {
        task.value.status = status.value
        const data = {...task.value, id:  route.params.id}
        await store.dispatch('request/update', data)
        task.value.status = status.value
        Swal.fire({
          title: 'Заявка обновлена',
          icon: 'success',
          confirmButtonText: 'Ок'
        })

      } catch (e) {
        Swal.fire({
          title: 'Не удалось удалить заявку',
          text:error(route.query.message),
          icon: 'error',
          confirmButtonText: 'Ок'
        })
      }
    }

    return {
      id: route.params.id,
      remove, update,
      hasChanges,
      close, loading, task, status
    }
  },
  components: {
    AppPage,
    AppStatus,
    AppLoader,
  }
}
</script>
