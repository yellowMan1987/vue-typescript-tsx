
<template>
  <i
    :class="[
      'vtx-icon',
      'iconfont',
      name,
      disabled ? 'is-disabled' : ''
    ]"
    :style="{
      'font-size': `${size / 100}rem`,
    }"
    @click="handleClick"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
    @mousedown="handleMousedown"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import './style.scss'

@Component<Icon>({
  props: {
    name: {
      type: String,
      // required: true
    },
    size: {
      type: Number,
    },
    type: {
      type: String,
      default: 'iconfont',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    text: String,
    needHover: {
      type: Boolean,
      default: true,
    }
  },
  computed: {},
  methods: {},
  watch: {},
})

export default class Icon extends Vue {
  name!: string;
  size!: number;
  type!: "svg" | "iconfont";
  isHovering = false;
  disabled!: boolean;
  text!: string;
  needHover!: boolean;

  created() {}
  mounted() {}
  beforeDestroy() {}

  handleClick(e: Event) {
    if (!this.disabled) {
      this.$emit("click", e);
    }
  }
  handleMouseenter() {
    if (this.needHover) {
      this.isHovering = true;
      this.$emit("mouseenter");
    }
  }
  handleMouseleave() {
    if (this.needHover) {
      this.isHovering = false;
      this.$emit("mouseleave");
    }
  }
  handleMousedown(e: Event) {
    if (!this.disabled) {
      this.$emit("mousedown",e);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit scss to this component only -->
<style lang="sass" scoped>

</style>
