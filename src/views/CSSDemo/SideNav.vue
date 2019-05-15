<template>
  <div class="vtx-sideNav">
    <ul class="vtx-sideNav__nav-warp">
      <span class="vtx-sideNav__nav-group-title">收集的一些有趣的 css demo</span>
      <li v-for="(item, index) in navs" :key="index" :class="['vtx-sideNav__sub-nav',$route.name === item.name ? 'is-active' : '']" 
        @click="toPath(item)">{{`${item.name} ${item.title}`}}</li>
    </ul>
  </div> 
</template>
<script>
import cssDemoNav from '@/router/nav-cssdemo';
export default {
  data() {
    return {
      navs: cssDemoNav,
    }
  },
  methods: {
    toPath(item) {
      this.$router.push(item.path);
      console.log(this.$route.name, item.name)
    },
    sideNavActive(name) {
      return this.$route.name === name ? 'is-active' : ''
    }
  }
}
</script>

<style lang="css" scoped>

</style>




