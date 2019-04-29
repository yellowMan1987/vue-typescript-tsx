import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapActions, mapMutations } from "vuex";
import { actionTypes, MODULE_PATH } from "@/store/modules/system";
import "./style.scss";

@Component<VtLanguage>({
  props: {},
  computed: {
    local() {
      switch (this.language) {
        case "zh_CN":
          return "中文";
        case "en_US":
          return "EN";
        case "ko":
          return "한국어";
        default:
          break;
      }
    },
    ...mapState(MODULE_PATH, ["language"])
  },
  methods: {
    ...mapMutations(MODULE_PATH, {
      updateLanguage: actionTypes.UPDATE_LANGUAGE
    })
  },
  watch: {}
})

export default class VtLanguage extends Vue {

  readonly updateLanguage!: (res: any) => void;
  readonly local!: string;
  readonly language!: string;

  render() {
    return (
      <div class="vtx-language">
      <el-dropdown onCommand={this.changeLanguage}>
        <span class="el-dropdown-link">
          {this.local}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="zh_CN">中文</el-dropdown-item>
          <el-dropdown-item command="en_US">EN</el-dropdown-item>
          <el-dropdown-item command="ko">한국어</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    );
  }

  changeLanguage(lang:string) {
    this.updateLanguage(lang);
    this.$i18n.locale = lang;
  }
}