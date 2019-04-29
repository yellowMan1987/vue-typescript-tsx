<template>
  <div class="vtx-nav">
    <router-link to="/">Component Demo</router-link> |
    <!-- <router-link to="/post">{{this.$t('article')}}</router-link> | -->
    <router-link to="/cssdemo">CSS Demo</router-link> |
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