
<template>
  <div class="vtx-list">
    <Card v-for="(item) in list" :key="item.name" :cardInfo="item"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Card from "@/views/Task/Card/index.vue";
import './style.scss'

@Component<List>({
  components:{
    Card,
  },
  props: {
    list: {
      type: Array,
    }
  },
  computed: {},
  methods: {},
  watch: {},
})

export default class List extends Vue {
  list!: any[];
  created() {}
  mouted() {}
  befordestoyed() {}
}
</script>

<!-- Add "scoped" attribute to limit scss to this component only -->
<style lang="sass" scoped>

</style>
