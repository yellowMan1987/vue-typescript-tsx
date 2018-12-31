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


//boy♂next♂door
//ass we can
//乖乖站好♀
@Component({
  components: {
    Example,
  },
  
})
export default class Home extends Vue {
  
}
</script>
