import { Component, Vue } from 'vue-property-decorator';
import './style.scss';
import VtSideNav from '~/VtSideNav';
@Component({
  name: 'demo',
  components: {
    'vt-side-nav': VtSideNav
  }
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