
<template>
  <div v-show="visible" class="vtx-globalAlarm">
    全局告警的告警
    <div>
      <el-button type="primary" size="small" @click="hide">确定</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import './style.scss'

@Component<GlobalAlarm>({
  components:{},
  props: {},
  computed: {},
  methods: {},
  watch: {},
})

export default class GlobalAlarm extends Vue {
  visible = true;
  created() {}
  mouted() {}
  befordestoyed() {}
  show() {
    this.visible = true;
  }
  hide() {
    this.visible = false;
  }
}
</script>

<!-- Add "scoped" attribute to limit scss to this component only -->
<style lang="sass" scoped>

</style>
