<template>
  <div class="fantasyNav">
    <h1>FantasyNav</h1>
    <div class="ui" id="js-ui">
      <nav class="scene_nav">
        <ol class="scene_nav_list">
          <li class="scene_nav_item" v-for="(params, index) in maxScene" :key="index">
            <button
              class="scene_nav_button"
              @click="scene = index"
              :class="{ 'o-active': scene === index }"
            ></button>
          </li>
        </ol>
      </nav>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      scene: 0,
      maxScene: 8,
    }
  }
}
</script>

<style lang="scss" scoped>
$keyColor: rgba(100, 250, 250, 1);
$buttonColor: rgba(10, 120, 150, 1);
$buttonSize: 50px;
$buttonActiveSize: 160px;
$buttonMargin: -8px;


h1 {
  color:#fff;
}
.fantasyNav {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 40vh;
  overflow: hidden;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
}

.scene_nav {
  position: relative;

  &_list {
    display: flex;
    margin: 0;
    padding: 0;
    transform: scaleY(0.6);
  }

  &_item {
    display: block;
    
    &:nth-child(even) {
      transform: scaleY(-1);
    }

    &:not(:first-child) {
      margin-left: $buttonMargin;
    }
  }

  &_button {
    display: block;
    width: $buttonSize;
    height: $buttonSize;
    margin: 0;
    padding: 0;
    border: none;
    background: $buttonColor;
    outline: none;
    cursor: pointer;
    transition: 500ms;
    clip-path: polygon(
      $buttonSize / 2 0,
      calc(100% - #{$buttonSize / 2}) 0,
      100% 100%,
      0 100%
    );
    
    &.o-active {
      width: $buttonActiveSize;
      background: $keyColor;
    }
    
    &:hover {
      background: $keyColor;
    }
  }
}
</style>




