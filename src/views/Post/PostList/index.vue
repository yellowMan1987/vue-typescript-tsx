
<template>
  <div class="vtx-postList">
    <div class="vtx-postList__list" v-for="(post, index) in posts" :key="index">
      <PostItem :post="post"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import PostItem from '@/views/Post/PostItem/index.vue';
import './style.scss'

@Component<PostList>({
  components:{
    PostItem,
  },
  props: {},
  computed: {},
  methods: {},
  watch: {},
})

export default class PostList extends Vue {
  posts = [
    {
      title: '标题标题',
      id: 1,
      des: '简介',
      tag: '分组',
      content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
      updateTime: 1545225926029
    },
    {
      title: '标题标题',
      id: 2,
      des: '简介',
      tag: '分组',
      content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
      updateTime: 1545225926029
      },
    {
      title: '标题标题',
      id: 3,
      des: '简介',
      tag: '分组',
      content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
      updateTime: 1545225926029
}

  ];
  created() {}
  mounted() {}
  beforeDestroy() {}
}
</script>

