
import { Component, Vue } from 'vue-property-decorator';
import { Button } from 'element-ui';
@Component({
  props: {},
  computed: {},
  methods: {},
  watch: {},
})

export default class Componenta extends Vue {
  render () {
    return (
      <div class="vtx-componenta">
        <h2>component-a</h2>
        <el-button type='success'>button</el-button>
      </div>
    );
  }
  created() {}
  mouted() {}
  befordestoyed() {}
}
