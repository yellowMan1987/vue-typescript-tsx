
<template>
  <div class="vtx-videoPlayer">
    this is vue template component
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import './style.scss'

@Component<VideoPlayer>({
  components:{},
  props: {},
  computed: {},
  methods: {},
  watch: {},
})

export default class VideoPlayer extends Vue {
  created() {}
  mounted() {}
  beforeDestroy() {}
}
</script>

<!-- Add "scoped" attribute to limit scss to this component only -->
<style lang="sass" scoped>

</style>
