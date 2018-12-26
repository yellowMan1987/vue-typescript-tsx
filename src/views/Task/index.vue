
<template>
  <div class="vtx-task">
    <draggable class="vtx-task__drag-container" @start="start" @end="end" :options="{group:'taskList'}">
      <List v-for="(list,index) in taskList" :key="index" :list="list"/>
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
      console.log("watch", val);
    }
  }
})
export default class Task extends Vue {
  taskList!: ILists[];
  created() {}
  mouted() {}
  befordestoyed() {}
  start(e: any) {
    console.log(e);
  }
  end(e: any) {
    console.log(e);
  }
}
</script>

<!-- Add "scoped" attribute to limit scss to this component only -->
<style lang="sass" scoped>

</style>
