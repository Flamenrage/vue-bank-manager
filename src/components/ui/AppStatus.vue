<template>
  <span class="badge" :class="status.class">{{status.name}}</span>
</template>


<script>
import {computed} from 'vue'
export default {
  props: ['type'],
  setup(props) {
    const status = computed(() => {
      switch (props.type) {
        case 'active':
          return {name: 'Активен', class: 'active'}
        case 'done':
          return {name: 'Завершен', class: 'done'}
        case 'cancelled':
          return {name: 'Отменен', class: 'cancelled'}
        case 'pending':
          return {name: 'Выполняется', class: 'pending'}
      }
    })
    return {status}
  }
}

</script>
