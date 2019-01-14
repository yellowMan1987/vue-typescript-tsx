
<template>
  <div v-if="visible" class="vtx-waterMark">
    <ul class="vtx-waterMark__container">
        <li v-for="(i,index) in total" :key="index" class="vtx-waterMark__item">
          {{msg}}
        </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import './style.scss'

@Component<WaterMark>({
  components:{},
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    msg: {
      type: String,
      default: '防拍水印',
    }
  },
  computed: {},
  methods: {},
  watch: {},
})

export default class WaterMark extends Vue {
  visible!: boolean;
  msg!: string;
  total = 0;
  observer = new MutationObserver(() => this.$emit('change'));
  created() {}
  mounted() {
    this.calculateRowsAndCols(this.msg);
    this.observer.observe(this.$el, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });
  }
  beforedestoyed() {}
  calculateRowsAndCols(msg: string) {
    if (msg) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const maxWidth = width * 2;
      const maxHeight = height * 2;

      const itemWidth = (msg.length + 1) * 10;
      const itemHeight = 16 + 120;

      this.total = Math.floor(maxWidth / itemWidth) * Math.floor(maxHeight / itemHeight);
    } else {
      this.total = 0;
    }
  }
}
</script>
