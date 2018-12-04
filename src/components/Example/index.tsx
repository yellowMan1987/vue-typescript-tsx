
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapActions, mapMutations } from 'vuex';
import {
  actionTypes,
  MODULE_PATH,
} from '@/store/modules/system';
@Component({
  props: {},
  computed: {},
  methods: {
    ...mapMutations(MODULE_PATH,{
      updateThemes: actionTypes.UPDATE_THEMES,
    })
  },
  watch: {},
})

export default class Example extends Vue {

  updateThemes!: (res:any) => void;

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
        <select onChange={this.changeTheme}>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </select>
       </div>
      </div>
    );
  }
  created() {}
  mouted() {}
  befordestoyed() {}

  changeLanguage(lang:string) {
    this.$i18n.locale = lang
  }

  changeTheme (e:any) {
    this.updateThemes(e.target.value);
  }
}
