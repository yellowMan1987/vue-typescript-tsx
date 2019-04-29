import { Component, Vue } from 'vue-property-decorator'
import { mapState, mapActions, mapMutations } from 'vuex';
import {
  actionTypes,
  MODULE_PATH,
  IThemes,
} from '@/store/modules/system';
import './style.scss';

@Component({
  computed: {
    ...mapState(MODULE_PATH, ['theme', 'themes'])
  },
  methods: {
    ...mapMutations(MODULE_PATH, {
      updateThemes: actionTypes.UPDATE_THEMES,
    })
  },
})
export default class VtTheme extends Vue {
  theme!: string;
  themes!: IThemes[];
  updateThemes!: (res: any) => void;

  render() {
    return (
      <div class="vtx-theme">
        <el-select
          value={this.theme}
          onInput={this.changeTheme}
          placeholder=""
        >
          {
            this.themes.map((i, index) => {
              return (
                <el-option
                  key={index}
                  label={i.name}
                  value={i.value}
                />
              )
            })
          }
        </el-select>
      </div >
    );
  }

  changeTheme(val: string) {
    this.updateThemes(val);
  }

}