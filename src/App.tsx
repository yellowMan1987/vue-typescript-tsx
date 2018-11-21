import { Component, Vue } from 'vue-property-decorator';
import { resizeWindow, setHTMLfontSize } from '@/utils/global';

@Component({
  props: {},
  computed: {},
  methods: {},
  watch: {},
})

export default class App extends Vue {

  render() {
    return (
      <div id="app">
        <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>
        </div>
        <router-view/>
      </div>
    )
  }

  mounted() {
    setHTMLfontSize();
    resizeWindow(setHTMLfontSize);
  }
}


