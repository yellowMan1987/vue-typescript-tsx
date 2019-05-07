import { Component, Vue } from 'vue-property-decorator'
import { handleMarkerPositionOnDom } from "@/utils/dom";
import "./style.scss";

@Component<VtxContextMenu>({
  name: 'vtx-context-menu',
  props: {
    menuOptionsList: {
      type: Array,
      default() {
        return [];
      }
    },
    mousePosition: {
      type: Object,
      default() {
        return {
          left: 0,
          top: 0
        };
      }
    }
  },
  computed: {},
  methods: {},
  watch: {
    mousePosition: {
      deep: true,
      handler(value) {
        this.$nextTick(() => {
          this.showMenu();
          this.handleCoordinate(value);
        });
      }
    }
  }
})
export default class VtxContextMenu extends Vue {
  visible = false;
  $slots: any;
  coordinate: ICoordinate = {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  };
  mousePosition!: any;
  menuOptionsList!: any[];

  render() {
    return (
      <div
        class="vtx-contextMenu"
        ref="menu"
        style={{
          visibility: this.visible ? 'visible' : 'hidden',
          left: this.coordinate.left + 'px',
          top: this.coordinate.top + 'px',
        }}
      >
        {this.$slots.above}
        <ul class="vtx-contextMenu__list">
          {
            this.menuOptionsList.map((item, index) => {
              return (
                <li
                  v-show={!item.disable}
                  class={['vtx-contextMenu__list--item', item.class ? item.class : '']}
                  onClick={(event: any) => { this.handleItem(event, index) }}
                  onMouseleave={(event: any) => { this.handleMouseInOut(event, item) }}
                  onMouseenter={(event: any) => { this.handleMouseInOut(event, item) }}
                >
                  <span>{item.txt}</span>
                </li>
              )
            })
          }
        </ul>
        {this.$slots.below}
      </div >
    );
  }

  // 移除监听
  removeClickEvent() {
    document.removeEventListener("click", this.hideMenu);
  }

  // 添加监听,
  addClickEvent() {
    document.removeEventListener("click", this.hideMenu);
    document.addEventListener("click", this.hideMenu);
  }

  removeKeyupEvent() {
    document.removeEventListener("keyup", this.hideMenu);
  }

  addKeyupEvent() {
    document.removeEventListener("keyup", this.hideMenu);
    document.addEventListener("keyup", this.hideMenu);
  }

  removeWheelEvent() {
    document.removeEventListener("wheel", this.hideMenu);
  }

  addWheelEvent() {
    document.removeEventListener("wheel", this.hideMenu);
    document.addEventListener("wheel", this.hideMenu);
  }

  // 隐藏
  hideMenu(event: any) {
    if (event && event.type === "keyup") {
      if (event.keyCode === 27 || event.key === "Escape") {
        this.visible = false;
        this.removeKeyupEvent();
        this.removeClickEvent();
        this.removeWheelEvent();
        return;
      }
    }
    this.removeClickEvent();
    this.removeWheelEvent();
    this.visible = false;
    // this.$emit('contextMenuShow', false);
  }

  // 显示
  showMenu() {
    this.addClickEvent();
    this.addKeyupEvent();
    this.addWheelEvent();
    const { left, top } = this.mousePosition;
    this.coordinate.left = left;
    this.coordinate.top = top;
    this.visible = true;
    // this.$emit('contextMenuShow', true);
  }

  // 点击单项
  handleItem(event: any, item: any) {
    if (item.handle && typeof item.handle === "function") {
      item.handle(item, event);
      this.visible = false;
    }
  }

  // 处理坐标
  handleCoordinate(value: any) {
    const { clientX, clientY } = value;
    const menuDom = this.$refs.menu;
    const body = document.body;
    const position = handleMarkerPositionOnDom(
      { clientX, clientY },
      body,
      menuDom
    );
    this.coordinate.left = position.left;
    this.coordinate.top = position.top;
  }

  // 鼠标移入
  handleMouseInOut(event: any, item: any) {
    //  HTML5 写法
    event.target.classList.toggle("active");
    // 监听鼠标移入事件暴露接口
    if (event.type === "mouseenter") {
      this.$emit("enterItem", item);
    } else if (event.type === "mouseleave") {
      this.$emit("leaveItem", item);
    }
  }
}

export interface IMenuOptionItem {
  txt: string;
  class?: string;
  disable?: boolean;
  permission?: string;
  hide?: boolean;
  handle?: (item: any) => void;
}
export interface ICoordinate {
  left: number;
  top: number;
  right: number;
  bottom: number;
}
export interface IMousePosition {
  left: number;
  top: number;
}