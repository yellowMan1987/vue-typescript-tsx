import { Component, Vue } from 'vue-property-decorator'
import './style.scss';

@Component<VtDemoBlock>({
  name: 'vt-demo__block',
})
export default class VtDemoBlock extends Vue {
  showCode = false;

  render() {
    return (
      <div class="vtx-demo__block">
        <div class="vtx-demo__block-source">
          {this.$slots.source}
          {
            <span class="vtx-demo__block-code-icon" onClick={() => { this.showCode = !this.showCode }}>
              <span class="vtx-demo__code-operation"> {`>${this.showCode ? '收起' : '查看'}代码`}</span>
            </span>
          }
        </div>

        <div class="vtx-demo__block-mate">
          <span slot="mate"></span>
          {
            this.showCode &&
            <span class="vtx-demo__block-code-icon" onClick={() => { this.showCode = !this.showCode }}>
              <span class="vtx-demo__code-operation">{`> ${this.showCode ? '收起' : '查看'}代码`}</span>
            </span>
          }
        </div>

        <el-collapse-transition>
          <div class="vtx-demo__block-code" v-show={this.showCode}>
            {this.$slots.highlight}
          </div>
        </el-collapse-transition>
      </div>
    );
  }
  created() { }
  mounted() { }
  beforeDestroy() { }
}