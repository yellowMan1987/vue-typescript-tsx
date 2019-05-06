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
        <ul>
          {
            navComponent.map((nav) => {
              return (
                <li>
                  <span>{nav.name}</span>
                  <div class="vtx-sideNav__groups">
                  <ul>
                    {
                        nav.list.map((item) => {
                          return (
                            <li onClick={() => {this.toPath(item)}}>{item.title}</li>
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


  toPath(item: any) {
    if (!!!item.path) {
      return;
    }
    this.$router.push(item.path);
  }
}