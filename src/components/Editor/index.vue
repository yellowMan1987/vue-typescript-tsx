
<template>
  <div class="vtx-editor">
    <quill-editor :content="content" @change="onEditorChange"></quill-editor>
    <!-- <mavon-editor v-model="content" @change="onEditorChange"/> -->
    <div class="vtx-editor__content" v-html="content"></div>
    <el-button type="primary" @click="submit">SUBMIT</el-button>

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
    this.content = e.html;
    // console.log(e)
    this.$emit('getContent',this.content)
  }
  submit() {

  }
}
</script>
  
  <!-- Add "scoped" attribute to limit scss to this component only -->
  <style lang="sass" scoped>
  
  </style>
