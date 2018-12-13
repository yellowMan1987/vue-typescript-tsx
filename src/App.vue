<template>
  <div id="app" :class="className">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { resizeWindow, setHTMLfontSize } from '@/utils/global';
import { mapState, mapActions, mapMutations } from 'vuex';
import * as system from '@/store/modules/system';

@Component<App>({
  props: {},
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
})

export default class App extends Vue {
  theme!: string;
  className = 'theme-';

  mounted() {
    this.className = `theme-${this.theme}`
    setHTMLfontSize();
    resizeWindow(setHTMLfontSize);
  }
}



</script>
