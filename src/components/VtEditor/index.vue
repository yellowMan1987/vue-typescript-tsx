
<template>
  <div class="vtx-editor">
    <quill-editor :content="content" @change="onEditorChange"></quill-editor>
    <div class="vtx-editor__content" v-html="content"></div>
    <el-button type="primary" @click="submit">SUBMIT</el-button>

  </div>
</template>
  
  <script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VueQuillEditor from 'vue-quill-editor'
import "./style.scss";


// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor, /* { default global options } */)

@Component<VtEditor>({
  components: {},
  props: {},
  computed: {},
  methods: {},
  watch: {}
})
export default class VtEditor extends Vue {
  content: string = "";
  created() {}
  mounted() {}
  beforeDestroy() {}
  onEditorChange(e: any) {
    this.content = e.html;
    this.$emit('getContent',this.content)
  }
  submit() {

  }
}
</script>
  
  <!-- Add "scoped" attribute to limit scss to this component only -->
  <style lang="sass" scoped>
  
  </style>
