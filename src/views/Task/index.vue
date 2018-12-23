
<template>
  <div class="vtx-task">
    <div 
      class="vtx-task__drop-container"
      v-for="(list,index) in lists"
      :key="index" 
      id="div1" 
      @ondrop="drop" 
      @ondragover="allowDrop"
    >
      list
    </div>
    <!-- <List
      v-for="(list,index) in lists"
      :key="index"
      :list="list"
      @changeList="changeList"
      id="drag1"
      :draggable="true"
      @ondragstart="drag"
    /> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import List from "./List/index.vue";
import "./style.scss";

@Component<Task>({
  components: {
    List
  },
  props: {},
  computed: {},
  methods: {},
  watch: {}
})
export default class Task extends Vue {
  lists = [
    [
      {
        title: "title1",
        name: "card1",
        description: "description1"
      },
      {
        title: "title2",
        name: "card2",
        description: "description2"
      },
      {
        title: "title3",
        name: "card3",
        description: "description3"
      },
      {
        title: "title4",
        name: "card4",
        description: "description4"
      },
      {
        title: "title5",
        name: "card5",
        description: "description5"
      },
      {
        title: "title6",
        name: "card6",
        description: "description6"
      }
    ],
    [
      {
        title: "title1",
        name: "namea1",
        description: "description1"
      },
      {
        title: "title2",
        name: "namea2",
        description: "description2"
      },
      {
        title: "title3",
        name: "namea3",
        description: "description3"
      },
      {
        title: "title4",
        name: "namea4",
        description: "description4"
      },
      {
        title: "title5",
        name: "namea5",
        description: "description5"
      },
      {
        title: "title6",
        name: "namea6",
        description: "description6"
      }
    ],
    [
      {
        title: "title1",
        name: "name11",
        description: "description1"
      },
      {
        title: "title2",
        name: "name22",
        description: "description2"
      },
      {
        title: "title3",
        name: "name33",
        description: "description3"
      },
      {
        title: "title4",
        name: "name44",
        description: "description4"
      },
      {
        title: "title5",
        name: "name55",
        description: "description5"
      },
      {
        title: "title6",
        name: "name66",
        description: "description6"
      }
    ]
  ];
  created() {}
  mouted() {}
  befordestoyed() {}
  
  drag(ev: any) {
    ev.dataTransfer.setData("Text",ev.target.id);
    console.log("dragstart", ev);
  }

  drop(ev: any) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    ev.target.appendChild(document.getElementById(data));
  }

  allowDrop(ev: any) {
    ev.preventDefault();
  }

  changeList(lists: any[]) {
    this.lists = lists;
  }
}
</script>

<!-- Add "scoped" attribute to limit scss to this component only -->
<style lang="sass" scoped>

</style>
