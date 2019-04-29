import { Component, Vue } from 'vue-property-decorator'
@Component({
  props: {
    name: {
      type: String,
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
    text: {
      type: String,
      default: '',
    },
    needHover: {
      type: Boolean,
      default: true,
    }
  }
})
export default class VtIcon extends Vue {
  name!: string;
  size!: number;
  type!: "svg" | "iconfont";
  isHovering = false;
  disabled!: boolean;
  text!: string;
  needHover!: boolean;

  render() {
    const {
      name,
      size,
      handleClick,
      type,
      handleMouseenter,
      handleMouseleave,
      handleMousedown,
      disabled,
    } = this;
    return type === "svg" ? (
      <svg
        class={["vtx-icon", "icon", disabled ? "is-disabled" : ""]}
        aria-hidden="true"
        style={{
          'font-size': `${size / 100}rem`,
        }}
        onClick={handleClick}
        onMouseenter={handleMouseenter}
        onMouseleave={handleMouseleave}
        onMousedown={handleMousedown}
      >
        <use
          href={
            disabled
              ? `#icon-${name}-disabled`
              : this.isHovering ? `#icon-${name}-hover` : `#icon-${name}`
          }
        />
      </svg>
    ) : (
        <i
          class={[
            'vtx-icon',
            'iconfont',
            name,
            disabled ? 'is-disabled' : ''
          ]}
          style={{
            'font-size': `${size / 100}rem`,
          }}
          onClick={handleClick}
          onMouseenter={handleMouseenter}
          onMouseleave={handleMouseleave}
          onMousedown={handleMousedown}
        > {this.text}</i>
      );
  }
  created() { }
  mounted() { }
  beforeDestroy() { }

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
      this.$emit("mousedown", e);
    }
  }
}