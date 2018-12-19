
<template>
  <div class="vtx-postItem">
    <div class="vtx-postItem__title">{{post.title}}</div>
    <div class="vtx-postItem__des">{{post.des}}</div>
    <div class="vtx-postItem__content">{{post.content}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import './style.scss'

@Component<PostItem>({
  components:{},
  props: {
    post: {
      type: Object,
      required: true,
    }
  },
  computed: {},
  methods: {},
  watch: {},
})

export default class PostItem extends Vue {
  created() {}
  mouted() {}
  befordestoyed() {}
}
</script>

<!-- Add "scoped" attribute to limit scss to this component only -->
<style lang="sass" scoped>

</style>
