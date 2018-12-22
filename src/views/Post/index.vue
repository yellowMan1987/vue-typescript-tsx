
<template>
  <div class="vtx-post">
    <span v-show="!isCreate" @click="isCreate = true">CREATE POST</span>
    <span v-show="isCreate" @click="isCreate = false">BACK LIST</span>
    <Editor v-show="isCreate" @getContent="getContent"/>
    <PostList v-show="!isCreate"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Editor from '@/components/Editor/index.vue';
import PostList from '@/views/Post/PostList/index.vue';
import './style.scss'

@Component<Post>({
  components:{
    Editor,
    PostList,
  },
  props: {},
  computed: {},
  methods: {},
  watch: {},
})

export default class Post extends Vue {
  isEdit = false;
  isCreate = false;
  created() {}
  mouted() {}
  befordestoyed() {}

  getContent(val:string) {
    console.log('getContent',val)
  }
}
</script>

