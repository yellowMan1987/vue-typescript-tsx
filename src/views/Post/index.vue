
<template>
  <div class="vtx-post">
    this is vue template component
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import './style.scss'

@Component<Post>({
  components:{},
  props: {},
  computed: {},
  methods: {},
  watch: {},
})

export default class Post extends Vue {
  created() {}
  mouted() {}
  befordestoyed() {}
}
</script>

