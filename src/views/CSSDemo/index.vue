<template>
  <div class="cssDemo">
    <!-- <Macaron/> -->
  </div> 
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Macaron from '@/views/CSSDemo/Macaron.vue';
@Component({
  components: {
    Macaron,
  },
  
})
export default class CSSDemo extends Vue {
  
}
</script>

<style lang="css" scoped>
  .cssDemo {
    height: calc(100% -  0.8rem);
  }
</style>




