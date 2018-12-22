
<template>
  <div class="vtx-editor">
    <!-- <quill-editor :content="content" @change="onEditorChange"></quill-editor> -->
    <mavon-editor v-model="content" @change="onEditorChange"/>
    <div class="vtx-editor__content" v-html="content"></div>
  </div>
</template>
  
  <script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import "./style.scss";

@Component<Editor>({
  components: {},
  props: {},
  computed: {},
  methods: {},
  watch: {}
})
export default class Editor extends Vue {
  content: string = "";
  created() {}
  mouted() {}
  befordestoyed() {}
  onEditorChange(e: any) {
    this.content = e;
    // console.log(e)
    this.$emit('getContent',e)
  }
}
</script>
  
  <!-- Add "scoped" attribute to limit scss to this component only -->
  <style lang="sass" scoped>
  
  </style>
