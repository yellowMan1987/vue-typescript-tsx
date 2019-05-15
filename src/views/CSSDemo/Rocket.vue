<template>
  <div class="container">
    <div v-for="i in 20" :key="i" class="hover-area"></div>
    <div class="star-field">
      <div class="stars stars-sm"></div>
      <div class="stars stars-md"></div>
      <div class="stars stars-lg"></div>
    </div>
    <div class="ship">
      <div class="wrapper">
        <div class="body side left"></div>
        <div class="body main">
          <div class="wing left"></div>
          <div class="wing right"></div>
          <div class="booster"></div>
          <div class="exhaust"></div>
        </div>
        <div class="body side right"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>

  $--ship-size: 10vmin;
  
  $--sky-color: #1C1740;
  $--ship-color: #F9E2FE;
  $--ship-cap-color: crimson;
  $--ship-wing-color: #4C3198;
  $--ship-window-trim-color: #4C3198;
  $--ship-booster-color: #C38382;
  $--star-color: white;
  
  $--stars-sm-speed: 5s;
  $--stars-md-speed: 2s;
  $--stars-lg-speed: 1s;

@function star-generator($amount) {
  $value: (random(200) * 1vw) (random(200) * 1vh) $--star-color;
  
  @for $i from 2 through $amount {
    $value: #{$value}, (random(200) * 1vw) (random(200) * 1vh) $--star-color;
  }

  @return unquote($value);
}


// Globals
* {
  box-sizing: border-box;
}

.container {
  position: relative;
  height: 800px;
  display: flex;
  overflow: hidden;
  background-color: $--sky-color;
}

.ship,
.star-field {
  position: absolute;
  top: 50%;
  left: 50%;
  will-change: transform;
  transition: transform 0.4s ease;
  transform: translate(-50%, -50%);
}

.star-field {
  width: 200%;
  height: 200%;
  transition: transform 1s ease-out;
}


// Hover areas
.hover-area {
  $areas: 20;
  $split: $areas / 2;
  
  flex-grow: 1;
  z-index: 3;
    
  @for $i from 1 through $areas {
    &:nth-child(#{$i}):hover {
      @if $i <= $split {
        & ~ .ship,
        & ~ .star-field {
          transform: translate(-50%, -50%) rotate(-90deg + (($i - 1) * 10));
        }
      }
      
      @else if $i > $split {
        & ~ .ship,
        & ~ .star-field {
          transform: translate(-50%, -50%) rotate(0deg + (($i - ($split + 1)) * 10));
        }
      }
    }
  }
  
  &:active {
    ~ .star-field {
      .stars-sm {
        &:before, &:after { animation-duration: calc(5s / 2); }
        &:after { animation-delay: calc(5s / -4); }
      }
      .stars-md { 
        &:before, &:after { animation-duration: calc(2s / 2); }
        &:after { animation-delay: calc(2s / -4); }
      }
      .stars-lg {
        &:before, &:after { animation-duration: calc(1s / 2); }
        &:after { animation-delay: calc(1s / -4); }
      }
    }
    
    ~ .ship {
      .wrapper {
        animation: speed-up-ship 80ms linear infinite alternate;
      }
      .exhaust {
        animation: speed-up-exhaust 80ms linear infinite alternate;
      }
    }
  }
}


// Ship
.ship .wrapper {
  display: flex;
}

.ship .body {
  position: relative;
  background-color: $--ship-color;
  border-radius: 0 0 50% 50% / 76% 76% 15% 15%;
  
  &:before {
    content: '';
    position: absolute;
    border-radius: 50% 50% 50% 50% / 76% 76% 25% 25%;
  }
}

.ship .main {
  width: 10vmin;
  height: calc(10vmin * 1.5);
  box-shadow: inset rgba(black, 0.15) -0.5vmin 0 2vmin 0;
  
  &:before {
    bottom: 80%;
    width: 100%;
    height: 75%;
    background-color: inherit;
    box-shadow: inset rgba(black, 0.15) -0.5vmin 1vmin 1vmin 0;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: 75%;
    left: 0;
    right: 0;
    margin: auto;
    border: calc(10vmin / 15) solid $--ship-window-trim-color;
    width: calc(10vmin / 1.8);
    height: calc(10vmin / 1.8);
    box-shadow: 
      inset rgba(black, 0.075) -2vmin -2vmin 0 0,
      inset rgba(black, 0.1) -1vmin -1.5vmin 0 0;
    border-radius: 100%;
  }
}

.ship .side {
  width: calc(10vmin / 3);
  height: 10vmin;
  box-shadow: 
    inset rgba(black, 0.1) -0.5vmin 0 1vmin 0,
    inset rgba(black, 0.1) 0.5vmin 0 1vmin 0;
  
  &:before {
    bottom: 90%;
    width: 100%;
    height: 35%;
    background-color: $--ship-cap-color;
    box-shadow: 
      inset rgba(black, 0.2) -0.5vmin 1vmin 1vmin 0,
      inset rgba(white, 0.2) 0.5vmin 1vmin 1vmin 0;
  }
  
  &.left {
    left: 1px;
  }
  
  &.right {
    right: 1px;
  }
}

.ship .wing {
  position: absolute;
  bottom: 2vmin;
  background-color: $--ship-wing-color;
  width: calc(10vmin / 2);
  height: calc(10vmin / 1.5);
  z-index: 1;
  box-shadow: 
    inset rgba(black, 0.1) -0.5vmin 1vmin 1vmin 0,
    inset rgba(white, 0.1) 0.5vmin 1vmin 1vmin 0;
  
  &.left {
    right: 100%;
    border-radius: 100% 0 10% 10%;
  }
  
  &.right {
    left: 100%;
    border-radius: 0 100% 10% 10%;
  }
}

.ship .booster {
  position: absolute;
  top: 80%;
  left: 0;
  right: 0;
  margin: auto;
  width: calc(10vmin / 1.2);
  height: calc(10vmin / 2.5);
  background-color: $--ship-booster-color;
  border-radius: 0 0 50% 50% / 76% 76% 35% 35%;
  z-index: -1;
  box-shadow: 
    inset rgba(black, 0.3) -0.5vmin 1vmin 1vmin 0,
    inset rgba(white, 0.3) 0.5vmin 1vmin 1vmin 0,
    black 0 0 2vmin;
}

.ship .exhaust {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin: auto;
  width: calc(10vmin / 1.4);
  height: 80%;
  border-radius: 0 0 100% 100%;
  background-image: 
    linear-gradient(
      to bottom,
      yellow,
      transparent 70%
    );
  z-index: -2;
  transform-origin: 50% 0;
  animation: exhaust 0.1s linear alternate infinite;
}


// Stars
.stars {
  position: absolute;
  top: 0;
  left: 0;
  
  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    animation: stars linear infinite;
    transform: translateY(-100vh);
  }
  
  &-sm {
    width: 1px;
    height: 1px;
    
    &:before, &:after {
      box-shadow: star-generator(500);
      animation-duration: 5s;
    }
      
    &:after {
      animation-delay: calc(5s / -2);
    }
  }
  
  &-md {
    width: 2px;
    height: 2px;
    
    &:before, &:after {
      box-shadow: star-generator(200);
      animation-duration: 2s;
    }
      
    &:after {
      animation-delay: calc(2s / -2);
    }
  }
  
  &-lg {
    width: 4px;
    height: 4px;
    
    &:before, &:after {
      box-shadow: star-generator(50);
      animation-duration: 1s;
    }
    
    &:after {
      animation-delay: calc(1s / -2)
    }
  }
}


// Animations
@keyframes stars {
  0%   { opacity: 0; }
  20%  { opacity: 1; }
  80%  { opacity: 1; }
  100% {
    opacity: 0;
    transform: translateY(0);
  }
}

@keyframes exhaust {
  to { transform: scaleX(0.98) translateY(-1vmin); }
}

@keyframes speed-up-exhaust {
  from { transform: scale(0.98, 1); }
  to   { transform: scale(0.96, 1.5); }
}

@keyframes speed-up-ship {
  from { transform: translateY(-5%); }
  to   { transform: translateY(-3%); }
}

</style>




