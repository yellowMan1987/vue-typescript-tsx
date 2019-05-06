import { Component, Vue } from 'vue-property-decorator';
import './style.scss';
@Component({
  name: 'demo',
  props: {},
  computed: {},
  methods: {},
  watch: {},
})
export default class Demo extends Vue {
  render() {
    return (
      <div class="vtx-demo">
        <vt-side-nav></vt-side-nav>
        <div class="vtx-demo__container">
          <router-view></router-view>
        </div>
      </div>
    );
  }
  created() { }
  mounted() { }
  beforeDestroy() { }
}