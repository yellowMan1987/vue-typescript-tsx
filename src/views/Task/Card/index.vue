
<template>
  <div class="vtx-card">
    {{cardInfo.name}}  
    {{cardInfo.name}}  
  </div>
</template>

<script lang="ts">
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
  cardInfo!: any;
  created() {}
  mouted() {}
  befordestoyed() {}
}
</script>

<!-- Add "scoped" attribute to limit scss to this component only -->
<style lang="sass" scoped>

</style>
