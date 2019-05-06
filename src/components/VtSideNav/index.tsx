import { Component, Vue } from 'vue-property-decorator';
import navComponent from '../../router/nav-components';
import './style.scss';

@Component<VtSideNav>({
  name: 'vt-side-nav',
  props: {},
  computed: {},
  methods: {},
  watch: {},
})
export default class VtSideNav extends Vue {

  render() {
    return (
      <div class="vtx-sideNav">
        <ul class="vtx-sideNav__nav-warp">
          {
            navComponent.map((nav) => {
              return (
                <li class="vtx-sideNav__nav-group">
                  <span class="vtx-sideNav__nav-group-title">{nav.name}</span>
                  <div class="vtx-sideNav__nav-group-container">
                    <ul>
                      {
                        nav.list.map((item) => {
                          return (
                            <li class={['vtx-sideNav__sub-nav',this.sideNavActive(item.title)]} onClick={() => { this.toPath(item) }}>{item.title}</li>
                          )
                        })
                      }
                    </ul>

                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }

  mounted() {
    console.log(
      this.$route
    )
  }

  toPath(item: any) {
    if (!!!item.path) {
      return;
    }
    this.$router.push(item.path);
  }

  sideNavActive(name: string) {
    return this.$route.name === name ? 'is-active' : ''
  }
}