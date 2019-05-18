import { Component, Prop, Vue } from "vue-property-decorator";
import Card from "@/views/Task/Card";
import draggable from "vuedraggable";
import { ILists } from "@/store/modules/task";

import "./style.scss";

@Component<List>({
  components: {
    'task-card': Card,
    draggable
  },
  props: {
    list: {
      type: Object
    },
    taskList: {
      type: Array
    }
  },
  computed: {},
  methods: {},
  watch: {}
})
export default class List extends Vue {
  list!: ILists;
  taskList!: ILists[];

  render() {
    return (
      <div class="vtx-list">
        <div class="vtx-list__title"><span class="text">{this.list.name}</span></div>
        <draggable class="vtx-list__drag-container" onStart={this.start} onEnd={this.end} group="cards">
          {
            this.list.cards.map((item) => {
              return (
                <task-card cardInfo={item}/>
              )
            })
          }
        </draggable>
        <div class="vtx-list__add-card">
          <span class="text">添加卡片</span>
        </div>
      </div>
    )
  }
  created() {}
  mounted() {
  }
  beforeDestroy() {}

  start(e: any) {
  }
  end(e: any) {
  }
}