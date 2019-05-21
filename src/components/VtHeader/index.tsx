import { Component, Vue } from 'vue-property-decorator'
import VtNav from '~/VtNav';
import VtLanguage from '~/VtLanguage';
import VtTheme from '~/VtTheme';
import "./style.scss";

@Component({
  components: {
    'vt-nav': VtNav,
    'vt-language': VtLanguage,
    'vt-theme': VtTheme,
  }
})
export default class VtHeader extends Vue {
  visible = false;

  render() {
    return (
      <div class="vtx-header">
      <vt-nav/>
      <span class="vtx-header__setting el-icon-setting" onClick={() => this.visible = !this.visible}></span>
      <el-dialog visible={this.visible}>
        <div class="vtx-header__right" >
          <vt-language/>
          <vt-theme/>
          <el-button type="primary" onClick={() => this.visible = !this.visible}>关闭</el-button>
        </div>
      </el-dialog>
      
    </div>
    );
  }
  created() { }
  mounted() { }
  beforeDestroy() { }
}