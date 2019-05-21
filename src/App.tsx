import { Component, Vue } from 'vue-property-decorator'
import { resizeWindow, setHTMLfontSize } from '@/utils/global';
import { mapState, mapActions, mapMutations } from 'vuex';
import * as system from '@/store/modules/system';
import * as user from "@/apiService/apis/user";
import { initHeaders } from "@/apiService/apiBase/apiRequest";
import VtHeader from '~/VtHeader';
import VtDemoBlock from '~/VtDemoBlock';
// 加载 demo 模板;
Vue.component('vt-demo-block',VtDemoBlock);
@Component<App>({
  components: {
    'vt-header': VtHeader,
  },
  computed: {
    ...mapState(system.MODULE_PATH,['theme']),
    isDev() {
      return process.env.NODE_ENV === 'development';
    }
  },
  methods: {},
  watch: {
    theme(val) {
      this.className = `theme-${val}`;
    },
  },
})
export default class App extends Vue {
  theme!: string;
  className = 'theme-';
  refs:any;
  isDev!: boolean;

  render() {
    return (
      <div id="app" class={this.className}>
        {/* {!(this.$route.fullPath as any).includes('VtLiveBoard') && <vt-live-board/>} */}
        <vt-header/>
        <router-view/>
        <div class="footer">
          <span>© 2019 laoge.mobi</span>
          <span>粤ICP备17107475号-2	</span>
          <a title="Home page"  href="https://github.com/hedongxiaoshimei/vue-typescript-tsx">
            <div class="github">
              <svg height="24"  viewBox="0 0 16 16" version="1.1" width="24" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
            </div>
          </a>
        </div>
        
      </div>
    );
  }

  
  mounted() {
    initHeaders('');
    this.className = `theme-${this.theme}`
    setHTMLfontSize();
    resizeWindow(setHTMLfontSize);
    // user.getUserList().then((res) => {
    // }) 
  }
}