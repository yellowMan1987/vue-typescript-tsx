import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import Example from '@/components/Example';
import VueComponent from '@/components/VueComponent/index.vue';

@Component({
  components: {
    VueComponent,
  },
  
})
export default class Home extends Vue {
  render() {
    return (
      <div>
        <h1>使用tsx-class风格编写</h1>
        <Example />
        <VueComponent />
      </div> 
    ) 
  }
}