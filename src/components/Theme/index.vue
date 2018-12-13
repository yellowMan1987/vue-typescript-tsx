
  <template>
    <div class="vtx-theme">
      <el-select
        :value="theme"
        @input="changeTheme"
        placeholder=""
      >
        <el-option 
          v-for="(t,index) in themes"
          :key="index"
          :label="t.name" 
          :value="t.value"
        />
      </el-select>
    </div>
  </template>
  
  <script lang="ts">
  
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapActions, mapMutations } from 'vuex';
import {
  actionTypes,
  MODULE_PATH,
  IThemes,
} from '@/store/modules/system';
import './style.scss';

@Component<Theme>({
  computed: {
    ...mapState(MODULE_PATH, ['theme', 'themes'])
  },
  methods: {
    ...mapMutations(MODULE_PATH, {
      updateThemes: actionTypes.UPDATE_THEMES,
    })
  },
})

export default class Theme extends Vue {
  theme!: string;
  themes!:IThemes[];
  updateThemes!: (res: any) => void;


  changeTheme(val: string) {
    this.updateThemes(val);
  }
}

  </script>
  
  <!-- Add "scoped" attribute to limit scss to this component only -->
  <style lang="sass" scoped>
  
  </style>
