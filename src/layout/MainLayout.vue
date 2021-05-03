<template>
  <the-navbar></the-navbar>
  <the-sidebar></the-sidebar>
  <div class="container with-nav">
    <router-view></router-view>
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar";
import TheSidebar from "@/components/TheSidebar";
export default {
  components:{
    TheNavbar,
    TheSidebar
  }
}
</script>

<style scoped>

</style>
