<template>
  <p class="color-back" v-if="back">
    <router-link to="/" class="color-back">Вернуться назад</router-link>
  </p>
  <div class="card">
    <h1 class="card-title">
      {{title}}
      <slot name="header" />
    </h1>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    back: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    document.title = `${props.title} | Клон Банка`
  }
}
</script>

<style scoped>

</style>
