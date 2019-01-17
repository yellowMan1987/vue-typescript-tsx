<template>
  <div class="vtx-nav">
    <router-link to="/">{{this.$t('home')}}</router-link> |
    <!-- <router-link to="/article">{{this.$t('article')}}</router-link> | -->
   <router-link to="/post">哲学</router-link> |
     <router-link to="/cssdemo">CSS DEMO</router-link> |
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
  mounted() {}
  beforeDestroy() {}
}
</script>