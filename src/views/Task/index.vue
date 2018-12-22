
<template>
  <div class="vtx-task">
    this is vue template component
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import './style.scss'

@Component<Task>({
  components:{},
  props: {},
  computed: {},
  methods: {},
  watch: {},
})

export default class Task extends Vue {
  created() {}
  mouted() {}
  befordestoyed() {}
}
</script>

<!-- Add "scoped" attribute to limit scss to this component only -->
<style lang="sass" scoped>

</style>
