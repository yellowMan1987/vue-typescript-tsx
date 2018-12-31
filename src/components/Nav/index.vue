<template>
  <div class="vtx-nav">
    <router-link to="/">{{this.$t('home')}}</router-link> |
    <!-- <router-link to="/article">{{this.$t('article')}}</router-link> | -->
    <router-link to="/about">自由</router-link> |
    <router-link to="/about">哲学</router-link> |
    <!-- <router-link to="/post">POST</router-link> |
    <router-link to="/task">TASK</router-link> | -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import './style.scss'

@Component<Nav>({
  components:{},
  props: {},
  computed: {},
  methods: {},
  watch: {},
})

export default class Nav extends Vue {
  created() {}
  mouted() {}
  befordestoyed() {}
}
</script>

<!-- Add "scoped" attribute to limit scss to this component only -->
<style lang="sass" scoped>

</style>
