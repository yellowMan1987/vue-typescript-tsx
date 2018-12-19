
<template>
  <div class="vtx-post">
    <div v-for="(post, index) in posts" :key="index">
      <PostItem :post="post"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import PostItem from '@/views/Post/PostItem/index.vue';
import './style.scss'

@Component<Post>({
  components:{
    PostItem,
  },
  props: {},
  computed: {},
  methods: {},
  watch: {},
})

export default class Post extends Vue {
  posts = [
    {
      title: '标题标题',
      des: '简介',
      tag: '分组',
      content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
      updateTime: '1545225926029'
    },
    {
      title: '标题标题',
      des: '简介',
      tag: '分组',
      content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
      updateTime: '1545225926029'
    },
    {
      title: '标题标题',
      des: '简介',
      tag: '分组',
      content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
      updateTime: '1545225926029'
    },
    {
      title: '标题标题',
      des: '简介',
      tag: '分组',
      content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
      updateTime: '1545225926029'
    },
    {
      title: '标题标题',
      des: '简介',
      tag: '分组',
      content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
      updateTime: '1545225926029'
    },
    {
      title: '标题标题',
      des: '简介',
      tag: '分组',
      content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
      updateTime: '1545225926029'
    },
    {
      title: '标题标题',
      des: '简介',
      tag: '分组',
      content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
      updateTime: '1545225926029'
    },
    {
      title: '标题标题',
      des: '简介',
      tag: '分组',
      content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
      updateTime: '1545225926029'
    },

  ];
  created() {}
  mouted() {}
  befordestoyed() {}
}
</script>

