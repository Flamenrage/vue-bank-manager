<template>
  <app-page title="Список заявок">
    <template #header>
     <button class="btn primary" @click="modal = true">Создать</button>
    </template>
    <request-filter v-model="filter"></request-filter>
    <request-table v-if="!loading" :requests="requests"></request-table>
    <app-loader v-else></app-loader>
  </app-page>
  <teleport to="body">
    <app-modal v-if="modal" title="Создать заявку" @close="modal = false">
      <request-modal @created="modal = false"></request-modal>
    </app-modal>
  </teleport>
</template>

<script>
import AppPage from "@/components/ui/AppPage";
import RequestTable from '../components/requests/RequestTable'
import {ref} from 'vue'
import AppModal from "@/components/ui/AppModal";
import RequestModal from '../components/requests/RequestModal'
import {computed} from "vue";
import {useStore} from "vuex";
import {onMounted} from "vue";
import AppLoader from "@/components/ui/AppLoader";
import RequestFilter from "@/components/requests/RequestFilter";

export default {
  setup(){
    const loading = ref(false)
    const modal = ref(false)
    const store = useStore()
    const filter = ref({ })
    onMounted(async () => {
      loading.value = true
      await store.dispatch('request/load')
      loading.value = false
    })

    const requests = computed(() => store.getters['request/requests']
        .filter(reqArray => {
              if (filter.value.name) { //если поле имени фильтра не пустое, то
                  return reqArray.fio.includes(filter.value.name) //отправляем массив со значениями, в которых есть name фильтра
              } else { return reqArray }
            }
        )
        .filter(reqArray => {
          if (filter.value.status) { //если поле статуса фильтра не пустое, то
            return filter.value.status === reqArray.status //отправляем массив со значениями, у которых нужный статус фильтра
          } else { return reqArray }
        })
    )
    function close(){
      modal.value = false
    }
    return{
      modal,
      close, requests, loading, filter
    }
  },
  components:{
    AppPage,
    RequestTable,
    AppModal,
    RequestModal,
    AppLoader,
    RequestFilter
  }
}
</script>
