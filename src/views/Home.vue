<template>
  <div>
    <h1>使用tsx-class风格编写</h1>
    <Example />
    <VueComponent />
  </div> 
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import Example from '@/components/Example/index.vue';
import VueComponent from '@/components/VueComponent/index.vue';

@Component({
  components: {
    Example,
    VueComponent,
  },
  
})
export default class Home extends Vue {
  
}
</script>
