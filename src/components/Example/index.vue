<template>
  <div class="vtx-example">
    <!-- <div class="vtx-example__block">
      <h1>{{this.$t('lang')}}</h1>
      <Language/>
    </div>
    <div class="vtx-example__block">
      <h1>{{this.$t('theme')}}</h1>
      <Theme/>
    </div>
    <div class="vtx-example__block">
      <h2>{{this.$t('msg')}}</h2>
      <el-button type="primary" @click="openMsg">msg</el-button>
    </div>
    <div class="vtx-example__block">
      <h2>{{this.$t('contextMenu')}}</h2>
      <div
        :style="{
          height: '1rem',
          color: '#fff',
          background:'#d9d9d9'
        }"
        v-rightMouseClick="showContextMenu"
      ></div>
    </div> -->
    <div class="vtx-example__block">
      <h2>map</h2>
      <Map></Map>
    </div>
    <ContextMenu
      :mousePosition="rightMouseClickPosition"
      :menuOptionsList="contextMenuOpsList"
    ></ContextMenu>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Language from "@/components/Language/index.vue";
import Theme from "@/components/Theme/index.vue";
import ContextMenu,{IMenuOptionItem} from "@/components/ContextMenu/index.vue";
import Map from '@/components/Map/index.vue';
import "./style.scss"; 
@Component<Example>({
  components: {
    Theme,
    Language,
    ContextMenu,
    Map,
  },
  props: {},
  computed: {},

  watch: {}
})
export default class Example extends Vue {
  updateThemes!: (res: any) => void;
  rightMouseClickPosition = {
    clientX: 0,
    clientY: 0
  };
  contextActiveData: any;

  contextMenuOpsList = [
    {
      txt: "右键操作项",
      class: "",
      disable: false,
      handle: this.handleContextMenuClick
    },
    {
      txt: "右键操作项",
      class: "",
      disable: false,
      handle: this.handleContextMenuClick
    },
    {
      txt: "右键操作项",
      class: "",
      disable: true, // 不显示布控
      handle: this.handleContextMenuClick
    },
    {
      txt: "右键操作项",
      class: "",
      disable: false,
      handle: this.handleContextMenuClick
    }
  ] as IMenuOptionItem[];

  created() {}
  mouted() {}
  befordestoyed() {}

  // msg
  openMsg() {
    this.$message({
      duration: 1000,
      message: "错误 -- 信息",
      type: "error"
    });
  }

  // 右键操作
  showContextMenu(event: any, data: any) {
    const { clientX, clientY } = event;
    this.rightMouseClickPosition = { clientX, clientY };
    this.contextActiveData = data;
  }

  handleContextMenuClick() {}
}
</script>
