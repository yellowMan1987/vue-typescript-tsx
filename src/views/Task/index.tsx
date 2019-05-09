import { Component, Prop, Vue } from "vue-property-decorator";
import List from "./List/index";
import draggable from "vuedraggable";

import { mapState, mapActions, mapMutations } from "vuex";
import { actionTypes, MODULE_PATH, ILists } from "@/store/modules/task";
import "./style.scss";

@Component<Task>({
  components: {
    'task-list': List,
    draggable
  },
  props: {},
  computed: {
    ...mapState(MODULE_PATH, ['taskList',])
  },
  methods: {
    ...mapMutations(MODULE_PATH, {
      updateThemes: actionTypes.UPDATE_TASK
    })
  },
  watch: {
    taskList(val) {
      console.log('val',val)
    }
  }
})
export default class Task extends Vue {
  taskList!: ILists[];

  render() {
    return (
      <div class="vtx-task">
        <h2>任务卡片拖拽的示例</h2>
        <draggable class="vtx-task__drag-container" onStart={this.start} onEnd={this.end} group="taskList">
          {
            this.taskList.map((list) => {
              return (
                <task-list list={list}/>
              )
            })
          }
          <div class="vtx-list" >
            <div class="vtx-list__title">添加列表</div>
          </div>
        </draggable>
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