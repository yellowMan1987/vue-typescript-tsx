
<template>
  <div class="vtx-task">
    <draggable class="vtx-task__drag-container" @start="start" @end="end" group="taskList">
      <List v-for="(list,index) in taskList" :key="index" :list="list"/>
      <div class="vtx-list" >
        <div class="vtx-list__title">添加列表</div>
      </div>
    </draggable>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import List from "./List/index.vue";
import draggable from "vuedraggable";

import { mapState, mapActions, mapMutations } from "vuex";
import { actionTypes, MODULE_PATH, ILists } from "@/store/modules/task";
import "./style.scss";

@Component<Task>({
  components: {
    List,
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
    }
  }
})
export default class Task extends Vue {
  taskList!: ILists[];
  created() {}
  mounted() {}
  beforeDestroy() {}
  start(e: any) {
  }
  end(e: any) {
  }
}
</script>

<!-- Add "scoped" attribute to limit scss to this component only -->
<style lang="sass" scoped>

</style>
