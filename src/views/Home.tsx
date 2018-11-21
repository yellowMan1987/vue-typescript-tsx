import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import Example from '@/components/Example';

@Component({
  components: {
    HelloWorld,
  },
  
})
export default class Home extends Vue {
  render() {
    return (
      <div>
        <h1>使用tsx-class风格编写</h1>
        <Example />
        <HelloWorld />
      </div> 
    ) 
  }
}