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
        {this.cardInfo.name} 
        {this.cardInfo.name} 
      </div>
    )
  }
  created() {}
  mounted() {
    console.log('2222222222 d s')
  }
  beforeDestroy() {}
}