<template>
  <div class="camera">
    <div class="polaroid absolute">
    <div class="button absolute"></div>
    <div class="flash  absolute"></div>
    <div class="polaroid-body absolute"></div>
    <div class="blinker absolute"></div>
    <div class="stripes absolute"></div>
    <div class="zoom absolute">
        <div class="reflections absolute"></div>
    </div>
  </div>
  <div class="flashlight absolute"></div>
</div>

</template>

<script>
export default {
  
}
</script>

<style lang="scss" scope>
  .camera {
    height: 100%;
    width: 100%;
    overflow: hidden;
    padding: 0;
    margin: 0;
    background: #f4adad;
    align-items: center;
    justify-content: center;
    position: relative;
    * {
      position: absolute;
      box-sizing: border-box;
    }
    *:before, *:after {
      content: "";
      position: absolute;
    }
  }
  .absolute {
    // position: absolute;
  }

  .polaroid {
    width: 420px;
    height: 280px;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    background-color: #fff;
    border-radius: 40px;
    box-shadow:10px 10px #f29797;
  }

  .polaroid-body {
    background-color: #fff;
    border-radius: 40px;
    width: 100%;
    height: 100%;
    box-shadow: inset 15px -25px 55px -10px rgba(0,0,0,0.25), inset -15px 15px 40px -7px rgba(255,255,255,0.70), inset -15px 0px 10px -11px rgba(0,0,0,0.30);
  }
  .flash {
    width: 24%;
    height: 15%;
    background-color: #34495e;
    border-radius: 8px;
    top: -12%;
    box-shadow: inset 15px -25px 55px -10px rgba(0,0,0,0.25), inset -15px 15px 40px -7px rgba(0,0,0,0.70), inset -15px 0px 10px -11px rgba(0,0,0,0.30);
    left: 38%;
  }
  .flash:after {
    width: 36%;
    height: 60%;
    box-shadow: inset 15px -25px 55px -10px rgba(255,255,255,0.25), inset -15px 15px 40px -7px rgba(0,0,0,0.70), inset -15px 0px 10px -11px rgba(255,0,0,0.30);
    background-color: #7796b4;
    border-radius: 5px;
    top: 10%;
    left: 32%;
  }
  .button {
    background-color: #cb214a;
    border-radius: 10px;
    width: 10%;
    height: 10%;
    top: -4%;
    left: 14%;
    animation: button 5s linear infinite;
  }
  .blinker {
    width: 15px;
    height: 15px;
    top: 15%;
    left: 15%;
    border-radius: 15px;
    background-color: #212f3d;
    animation: blinker 5s linear infinite;
  }
  .zoom {
    border-radius: 50%;
    width: 50%;
    height: 75%;
    background: #212f3d;
    left: 25%;
    top: 12.5%;
    box-shadow: 10px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    border: 5px solid #34495e;
    animation: zoom 5s linear infinite;
  }
  .zoom:before {
    width: 80%;
    height: 80%;
    top: 5%;
    left: 5%;
    border-radius: 50%;
    background: #2c3e50;
    border: 10px solid #34495e;
  }
  .zoom:after {
    width: 40%;
    height: 40%;
    top: 30%;
    left: 30%;
    border-radius: 50%;
    background: #212f3d;
  }
  .reflections {
    background-color: #fff;
    opacity: 0.3;
    width: 100%;
    height: 100%;
    left: -35%;
    top: -35%;
    z-index: 99;
    transform: rotate(-45deg);
  }
  .reflections:after {
    background-color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    left: 50%;
    top: 105%;
    opacity: 0.5;
  }
  .stripes {
    right: 0;
    top: 40%;
    height: 7px;
    width: 50%;
    box-shadow: 0px 7px rgba(214, 0, 121, 1), 0px 14px rgba(230, 141, 21, 1), 0px 21px rgba(254, 200, 3, 1), 0px 28px rgba(221, 229, 107, 1), 0px 35px rgba(62, 162, 48, 1), 0px 42px rgba(1, 136, 194, 1);
  }

  @keyframes button {
    5%, 15% {
      transform: translateY(0);
    }
    10% {
      transform: translateY(10px);
    }
  }

  @keyframes zoom {
    20%, 32% {
      transform: rotate(0deg);
    }
    26% {
      transform: rotate(20deg);
    }
  }
  @keyframes blinker {
    32%, 37%, 39%, 43%, 45%, 50% {
      background-color: #212f3d;
    }
    34%, 36%, 40%, 42%, 46%, 48% {
      background-color: #cb214a;
    }
  }
</style>