<template>
  <div class="vtx-header">
    <Nav/>
    <span class="vtx-header__setting el-icon-setting" @click="visible = !visible"></span>
    <el-dialog :visible="visible">
      <div class="vtx-header__right" >
        <Language/>
        <Theme/>
        <el-button type="primary" @click="visible = !visible">关闭</el-button>
      </div>
    </el-dialog>
    
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Nav from "@/components/Nav/index.vue";
import Language from "@/components/Language/index.vue";
import Theme from "@/components/Theme/index.vue";
import "./style.scss";

@Component<Header>({
  components: {
    Nav,
    Language,
    Theme
  },
  props: {},
  computed: {},
  methods: {},
  watch: {}
})
export default class Header extends Vue {
  visible = false;
  created() {}
  mounted() {}
  beforeDestroy() {}
}
</script>

<!-- Add "scoped" attribute to limit scss to this component only -->
<style lang="sass" scoped>

</style>
