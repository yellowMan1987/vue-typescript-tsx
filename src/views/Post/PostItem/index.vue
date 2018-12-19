
<template>
  <div class="vtx-postItem">
    <div class="vtx-postItem__title">{{post.title}}</div>
    <div class="vtx-postItem__tag">
      <span>{{post.tag}}</span>
      <span>{{time}}</span>
    </div>
    <div class="vtx-postItem__des">{{post.des}}</div>
    <span  @click="showContent = !showContent">====>{{!showContent ? '显示文章内容' : '收起'}}</span>
    <div v-if="showContent" class="vtx-postItem__content">{{post.content}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { formatDate } from '@/utils/format';
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
  post: any;
  showContent = false;
  time = this.post.updateTime && formatDate(this.post.updateTime,'yyyy-MM-dd HH:mm:ss');
  created() {}
  mouted() {}
  befordestoyed() {}
}
</script>

<!-- Add "scoped" attribute to limit scss to this component only -->
<style lang="sass" scoped>

</style>
