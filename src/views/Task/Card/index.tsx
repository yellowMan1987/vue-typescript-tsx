import { Component, Prop, Vue } from 'vue-property-decorator';
import './style.scss'

@Component<Card>({
  components:{},
  props: {
    cardInfo: {
      type: Object,
    }
  },
  computed: {},
  methods: {},
  watch: {},
})

export default class Card extends Vue {
  readonly cardInfo!: any;
  render() {
    return (
      <div class="vtx-card">
        <span class="text">{this.cardInfo.name} </span>
      </div>
    )
  }
  created() {}
  mounted() {}
  beforeDestroy() {}
}