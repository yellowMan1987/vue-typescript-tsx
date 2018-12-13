<template>
  <div id="app" :class="className">
    <Header/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { resizeWindow, setHTMLfontSize } from '@/utils/global';
import { mapState, mapActions, mapMutations } from 'vuex';
import * as system from '@/store/modules/system';
import Header from "@/components/Header/index.vue";

@Component<App>({
  components: {
    Header,
  },
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
