import { Component, Vue } from 'vue-property-decorator'
import { resizeWindow, setHTMLfontSize } from '@/utils/global';
import { mapState, mapActions, mapMutations } from 'vuex';
import * as system from '@/store/modules/system';
import * as user from "@/apiService/apis/user";
import { initHeaders } from "@/apiService/apiBase/apiRequest";
@Component<App>({
  props: {},
  computed: {
    ...mapState(system.MODULE_PATH,['theme']),
    isDev() {
      return process.env.NODE_ENV === 'development';
    }
  },
  methods: {},
  watch: {
    theme(val) {
      console.log(val);
      this.className = `theme-${val}`;
    }
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
        <vt-header/>
        <router-view/>
      </div>
    );
  }

  mounted() {
    initHeaders('');
    this.className = `theme-${this.theme}`
    setHTMLfontSize();
    resizeWindow(setHTMLfontSize);
    // user.getUserList().then((res) => {
    //   console.log('请求====>',res)
    // }) 
  }
}