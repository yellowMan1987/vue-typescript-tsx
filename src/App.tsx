import * as tsx from 'vue-tsx-support'
import { VNode } from 'vue'
import { resizeWindow, setHTMLfontSize } from '@/utils/global';
import { mapState, mapActions, mapMutations } from 'vuex';
import * as system from '@/store/modules/system';
import Header from "@/components/Header";
import GlobalAlarm from "@/components/GlobalAlarm/index.vue";

interface IData {
  theme: string;
  className: string;
}
const App = tsx.component({
  name: 'App',
  components: {
    Header,
    GlobalAlarm,
  },
  props: {},
  data: {
    className: 'theme-',
  },
  computed: {
    ...mapState(system.MODULE_PATH,['theme'])
  },
  methods: {},
  watch: {
    theme(val) {
      console.log(val);
      this.className = `theme-${val}`;
    }
  },


  render(): VNode {
    return (
      <div id="app" class="className">
        <Header/>
        {/* <GlobalAlarm/> */}
        <router-view/>
      </div>
    )
  },
  mounted() {
    this.className = `theme-${this.theme}`
    setHTMLfontSize();
    resizeWindow(setHTMLfontSize);
  }
})

export default App
