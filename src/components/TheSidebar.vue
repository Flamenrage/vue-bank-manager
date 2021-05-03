<template>
  <div class="sidebar" v-if="sidebar">
    <span class="sidebar-close" @click="close">&times;</span>

    <div class="sidebar-content">
      <p>Добро пожаловать в систему по учету заявок в нашем банке. Здесь вы найдете исчерпывающую информацию про систему и заявки</p>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {computed} from "@vue/reactivity";

export default {
  setup(){
    const store= useStore()
    const sidebar = computed (() => store.state.sidebar)
    return{
      close: () => store.commit('closeSidebar'),
      sidebar
    }
  }
  }
</script>

<style scoped>

</style>
