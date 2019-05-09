<template>
  <div class="vtx-home">
    <h1>假装有个首页...</h1>
    <h1>隔壁集成了一些有趣的东西...</h1>
    <Terminal/>
  </div> 
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Terminal from '@/views/CSSDemo/Terminal.vue';

@Component({
  components: {
    Terminal,
  },
})
export default class Home extends Vue {
  
}
</script>

<style lang="scss" scoped>
@import "src/themes/mixins/mixins.scss";

@include b(home) {
  padding: 0 5vw;
  height: calc(100% - 1rem);
}
</style>

