
<template>
  <div class="vtx-list">
    <div>{{list.name}}</div>
    <Card v-for="(item) in list.cards" :key="item.name" :cardInfo="item"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Card from "@/views/Task/Card/index.vue";
import { ILists } from "@/store/modules/task";

import "./style.scss";

@Component<List>({
  components: {
    Card,
  },
  props: {
    list: {
      type: Object
    }
  },
  computed: {},
  methods: {},
  watch: {}
})
export default class List extends Vue {
  list!: ILists;
  created() {}
  mouted() {}
  befordestoyed() {}
}
</script>

<!-- Add "scoped" attribute to limit scss to this component only -->
<style lang="sass" scoped>

</style>
