
<template>
  <div class="vtx-list">
    <div class="vtx-list__title">{{list.name}}</div>
    <draggable class="vtx-list__drag-container" @start="start" @end="end" group="cards">
      <Card v-for="(item) in list.cards" :key="item.name" :cardInfo="item"/>
    </draggable>
    <div class="vtx-list__add-card">添加卡片</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Card from "@/views/Task/Card/index.vue";
import draggable from "vuedraggable";

import { ILists } from "@/store/modules/task";

import "./style.scss";

@Component<List>({
  components: {
    Card,
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
  created() {}
  mounted() {}
  beforeDestroy() {}

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
