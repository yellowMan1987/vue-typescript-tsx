<template>
  <div class="cssDemo">
    <Macaron/>
    <FantasyNav/>
  </div> 
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Macaron from '@/views/CSSDemo/Macaron.vue';
import FantasyNav from '@/views/CSSDemo/FantasyNav.vue';
@Component({
  components: {
    Macaron,
    FantasyNav,
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




