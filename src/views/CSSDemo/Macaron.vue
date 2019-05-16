<template>
  <div class="css_content">
    <h1>MACARON</h1>
    <div v-for="i in macarons" :key="i" class="container">
      <div class="macaron green">
        <div class="face"></div>
        <div class="shadow"></div>
      </div>
      <div class="macaron yellow">
        <div class="face"></div>
        <div class="shadow"></div>
      </div>
      <div class="macaron pink">
        <div class="face"></div>
        <div class="shadow"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      macarons: [1,2,3],
    }
  }
}
</script>

<style lang="scss" scoped>
$green: #a2ccb6;
$yellow: #fceeb5;
$pink: #ee786e;

@mixin mcolor($type) {
  background: darken($type, 10%);
  border: 2px solid darken($type, 15%);
  .face {
    border-bottom: 5px solid darken($type, 50%);
    &::before,
    &::after {
      background: darken($type, 50%);
    }
  }
  &::before,
  &::after {
    background: $type;
    border: 2px solid darken($type, 5%);
  }
}

@mixin mdelays($s) {
  animation-delay: $s;
  .face,
  .shadow,
  &::before,
  &::after {
    animation-delay: $s;
  }
}

h1 {
  color:#fff;
}
.css_content {
  width: 100%;
  height: 40vh;
  margin: 0;
  padding: 0;
  background: #4cc7f4;
  display: flex;
  overflow: hidden;
}

.container {
  position: relative;
  height: 100%;
  min-width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  animation: 8s march linear infinite;
}

.macaron {
  position: relative;
  top: 30px;
  width: 180px;
  height: 25px;
  border-radius: 20px / 50px;
  box-sizing: border-box;
  animation: 1.2s bounce infinite;
  .face {
    position: absolute;
    top: -32px;
    left: 60%;
    width: 20px;
    height: 40px;
    border-radius: 50%;
    border: 5px solid transparent;
    z-index: 2;
    animation: 1.2s squish-face infinite;
    &::before,
    &::after {
      display: block;
      content: "";
      position: absolute;
      top: 30px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    &::before {
      left: -20px;
    }
    &::after {
      right: -20px;
    }
  }
  .shadow {
    position: absolute;
    top: 80px;
    width: 180px;
    height: 25px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.05);
    animation: 1.2s shadow-shift infinite;
  }
  &::before,
  &::after {
    display: block;
    content: "";
    position: absolute;
    left: -2px;
    width: 180px;
    height: 30px;
    box-sizing: border-box;
  }
  &::before {
    top: -31px;
    border-radius: 1200px / 270px;
    border-bottom-left-radius: 100px;
    border-bottom-right-radius: 100px;
    animation: 1.2s squish-top infinite;
  }
  &::after {
    top: 22px;
    border-radius: 1200px / 270px;
    border-top-left-radius: 100px;
    border-top-right-radius: 100px;
    animation: 1.2s squish-bottom infinite;
  }
}

.green {
  @include mcolor($green);
  @include mdelays(0.1s);
}

.yellow {
  @include mcolor($yellow);
  @include mdelays(0.25s);
}

.pink {
  @include mcolor($pink);
}

@keyframes bounce {
  0% {
    top: 30px;
  }
  25% {
    top: 0;
    transform: rotate(-5deg);
  }
  50% {
    top: 30px;
  }
  75% {
    top: 0;
    transform: rotate(5deg);
  }
  100% {
    top: 30px;
  }
}

@keyframes shadow-shift {
  0% {
    top: 40px;
    left: 0;
    width: 180px;
  }
  25% {
    top: 70px;
    left: 0;
    transform: rotate(5deg);
    width: 150px;
  }
  50% {
    top: 40px;
    left: 0;
    width: 180px;
  }
  75% {
    top: 70px;
    left: 30px;
    transform: rotate(-5deg);
    width: 150px;
  }
  100% {
    top: 40px;
    left: 0;
    width: 180px;
  }
}

@keyframes squish-top {
  0% {
    top: -25px;
  }
  45% {
    top: -32px;
  }
  50% {
    top: -25px;
  }
  75% {
    top: -31px;
  }
  100% {
    top: -25px;
  }
}

@keyframes squish-bottom {
  0% {
    top: 20px;
  }
  25% {
    top: 22px;
  }
  50% {
    top: 20px;
  }
  75% {
    top: 22px;
  }
  100% {
    top: 20px;
  }
}

@keyframes squish-face {
  0% {
    top: -30px;
  }
  25% {
    top: -32px;
  }
  50% {
    top: -30px;
  }
  75% {
    top: -32px;
  }
  100% {
    top: -30px;
  }
}

@keyframes march {
  0% {
    left: -800px;
  }
  100% {
    left: 0;
  }
}
</style>

