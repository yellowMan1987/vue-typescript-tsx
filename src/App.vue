<template>
  <div id="app" :class="className">
    <Header/>
    <GlobalAlarm v-if="!isDev"/>
    <Login/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { resizeWindow, setHTMLfontSize } from '@/utils/global';
import { mapState, mapActions, mapMutations } from 'vuex';
import * as system from '@/store/modules/system';
import Header from "@/components/Header/index.vue";
import GlobalAlarm from "@/components/GlobalAlarm/index.vue";
import Login from "@/views/Login/index.vue";
import * as user from "@/apiService/apis/post";
import { initHeaders } from "@/apiService/apiBase/apiRequest";

@Component<App>({
  components: {
    Header,
    GlobalAlarm,
    Login,
  },
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

  mounted() {
    initHeaders('');
    this.className = `theme-${this.theme}`
    setHTMLfontSize();
    resizeWindow(setHTMLfontSize);
    user.getUserList().then((res) => {
      console.log('请求====>',res)
    }) 
  }
}



</script>
