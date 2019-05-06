
<template>
  <div class="vtx-post">
    <span v-show="!isCreate" @click="isCreate = true">CREATE POST</span>
    <span v-show="isCreate" @click="isCreate = false">BACK LIST</span>
    <div v-show="isCreate" >
      <VtEditor @getContent="getContent"/>
    </div>
    <PostList v-show="!isCreate"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VtEditor from '@/components/VtEditor/index.vue';
import PostList from '@/views/Post/PostList/index.vue';
import './style.scss'

@Component<Post>({
  components:{
    VtEditor,
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
  mounted() {}
  beforeDestroy() {}

  getContent(val:string) {
  }
}
</script>

