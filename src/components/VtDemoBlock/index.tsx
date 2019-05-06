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
              <span>{`${this.showCode ? '收起' : '查看'}代码`}</span>
            </span>
          }
        </div>

        <div class="vtx-demo__block-mate">
          <span slot="mate"></span>
          {
            <span class="vtx-demo__block-code-icon" onClick={() => { this.showCode = !this.showCode }}>
              <span>{`${this.showCode ? '收起' : '查看'}代码`}</span>
            </span>
          }
        </div>

        {
          this.showCode &&
          <div class="vtx-demo__block-code">
            {this.$slots.highlight}
          </div>
        }
      </div>
    );
  }
  created() { }
  mounted() { }
  beforeDestroy() { }
}