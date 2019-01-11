import * as tsx from 'vue-tsx-support'
import { VNode } from 'vue'
import Nav from "@/components/Nav/index.vue";
import Language from "@/components/Language/index.vue";
import Theme from "@/components/Theme/index.vue";
import "./style.scss";

const Header = tsx.component({
  name: 'App',
  components: {
    Nav,
    Language,
    Theme
  },
  props: {},
  data:{
    visible: false,
  },
  computed: {},
  methods: {},
  watch: {},


  render(): VNode {
    return (
      <div class="vtx-header">
      <Nav/>
      <span class="vtx-header__setting el-icon-setting" onClick={this.visible = !this.visible}></span>
      <el-dialog visible={this.visible}>
        <div class="vtx-header__right" >
          <Language/>
          <Theme/>
          <el-button type="primary" onClick={this.visible = !this.visible}>关闭</el-button>
        </div>
      </el-dialog>
    
  </div>
    )
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
})

export default Header
