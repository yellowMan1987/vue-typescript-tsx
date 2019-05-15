<template>
  <div class="cssDemo">
    <SideNav />
    <div class="container">
      <router-view></router-view>
    </div>
  </div> 
</template>
<script>
import SideNav from './SideNav.vue';

export default {
  components: {
    SideNav
  },
}
</script>

<style lang="css" scoped>
  .cssDemo {
    display: flex;
    height: calc(100% -  0.8rem);
    margin: 0 5vw;
  }
  .container {
    height: 100%;
    width: calc(100% - 3rem);
  }
</style>




