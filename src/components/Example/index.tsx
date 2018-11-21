
import { Component, Vue } from 'vue-property-decorator';
import vueI18n from 'vue-i18n';

@Component({
  props: {},
  computed: {},
  methods: {},
  watch: {},
})

export default class Example extends Vue {
  render () {
    return (
      <div class="vtx-example">
       <div class="vtx-example__block">
        <h1>国际化</h1>
          <el-button 
            type='success'
            onClick={() => this.changeLanguage('zh_CN')}
          >
            {this.$t('cn')}
          </el-button>
          <el-button 
            type='success'
            onClick={() => this.changeLanguage('en_US')}
          >
            {this.$t('en')}
          </el-button>
       </div>
       <div class="vtx-example__block">
        <h1>换肤</h1>
          <el-button 
            type='success'
            onClick={() => this.changeTheme('theme1')}
          >
            绿色 
          </el-button>
          <el-button 
            type='success'
            onClick={() => this.changeTheme('theme2')}
          >
            红色
          </el-button>
       </div>
      </div>
    );
  }
  created() {}
  mouted() {}
  befordestoyed() {}

  changeLanguage(lang: string) {
    this.$i18n.locale = lang
  }

  changeTheme (theme: string) {
    window.document.documentElement && 
    window.document.documentElement.setAttribute('data-theme', theme)
  }
}
