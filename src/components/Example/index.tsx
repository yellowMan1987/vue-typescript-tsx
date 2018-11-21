
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
    );
  }
  created() {}
  mouted() {}
  befordestoyed() {}

  changeLanguage(lang:string) {
    this.$i18n.locale = lang
  }
}
