<template>
<component :is="layoutPath + '-layout'" v-if="layoutPath"></component>
<!--  v-if нужен для избежания бага, когда layout не определен-->
</template>

<script>
import MainLayout from "@/layout/MainLayout";
import AuthLayout from "@/layout/AuthLayout";
import {useRoute} from 'vue-router'
import {computed} from "vue";
export default {
  setup(){
    const route = useRoute()
    const layoutPath = computed (() => route.meta.layout) //обязательно через computed, иначе будет пустой объект
    console.log()
    return{
      layoutPath
    }
  },
  components:{
    MainLayout,
    AuthLayout
  }
}
</script>

<style scoped>

</style>
