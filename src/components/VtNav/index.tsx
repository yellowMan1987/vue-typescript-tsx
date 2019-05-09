import { Component, Vue } from 'vue-property-decorator'
import './style.scss'

@Component({
  props: {},
  computed: {},
  methods: {},
  watch: {},
})
export default class VtNav extends Vue {
  render() {
    return (
      <div class="vtx-nav">
        <router-link to="/post">Post</router-link> |
        <router-link to="/components">Component Demo</router-link> |
        <router-link to="/taskdemo">Task Demo</router-link> |
        <router-link to="/cssdemo">Css Demo</router-link> |
        <router-link to="/mapdemo">Map Demo</router-link> |
      </div>
    );
  }
  created() { }
  mounted() { }
  beforeDestroy() { }
}