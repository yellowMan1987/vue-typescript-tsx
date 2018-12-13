<template>
  <div>
    <h1>{{this.$t('des')}}</h1>
    <Example />
  </div> 
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import Example from '@/components/Example/index.vue';

@Component({
  components: {
    Example,
  },
  
})
export default class Home extends Vue {
  
}
</script>
