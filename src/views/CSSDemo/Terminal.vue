<template>
  <div class="terminal_wrap">
    <div class="contenedor">
      <div class="terminal">
        <div class="header">
          <div class="bolitas">
            <div class="red"></div>
            <div class="yellow"></div>
            <div class="green"></div>
          </div>
          <div class="titulo">Terminal</div>
          <div class="vacio"></div>
        </div>
        <div class="terminal_content">
          <p class="texto">{{text}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        text: "",
        mandale: null,
    }
  },

  methods: {
    escribir(palabras) {
      let i = 0;

      let palabra = palabras.split("");
      const that = this;
      that.mandale = setInterval(function() {
        that.text = that.text + palabra[i];

        i++;

        if (i === palabra.length) {

          clearInterval(that.mandale);
          setTimeout(() => {
            that.text = "";
            that.enter();
          }, 1000);
        }
      }, 200);
    },

    enter() {
      this.escribir("cd Documents/laoge/vue-typescript-jsx-demo/");
    }
  },
  mounted() {
    this.enter();
  },
  beforeDestroy() {
    this.mandale && clearInterval(this.mandale);
  }

}
</script>

<style lang="scss" scoped>
@import "src/themes/mixins/mixins.scss";

.terminal_wrap {
  display: flex;
  margin: 0;
  padding: 0.2rem 0;
  box-sizing: border-box;
  font-family: Microsoft Yahei;
  // font: bold 100% PingFang SC, Lantinghei SC, Microsoft Yahei, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans-serif;;
  font-weight: 600;
  height: 50vh;
}
.terminal {
  height: 40vh;
  width: 60vw;
  /* border: 1px solid red; */
  border-radius: 10px 10px 10px 10px;
  min-width: 300px;
	box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
}
.terminal_content {
  height: calc(100% - 0.3rem);
  background-color: rgb(57, 52, 86);
  border-radius: 0px 0px 10px 10px;
}
.titulo {
  opacity: 0.6;
  line-height: 0.3rem;
}
.red,
.yellow,
.green {
  height: 13px;
  width: 13px;
  border-radius: 50%;
}
.red {
  background-color: rgb(252, 98, 93);
}
.yellow {
  background-color: rgb(254, 192, 65);
  margin: 0 0.3em;
}
.green {
  background-color: rgb(53, 204, 75);
}
.bolitas {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0.6em;
}
.header {
  display: flex;
  justify-content: space-between;
  // padding: 0.2em;
  background-color: rgb(229, 229, 229);
  /* border: 1px solid red; */
  border-radius: 10px 10px 0px 0px;
  height: 0.3rem;
}
.flex {
  display: flex;
  align-items: center;
}
.texto {
  position: relative;
  color: white;
  font-size: 0.9em;
  padding-left: 1em;
  margin-right: 1em;
  text-align: left;
}

.texto:before {
  content: "laoge: ~laoge$ ";
  opacity: 0.5;
  left: 0;
}

.texto:after {
  content: "";
  position: absolute;
  display: inline-block;
  background-color: #fff;
  height: 15px;
  width: 3.5px;
  animation: 2s parpadeo infinite;
}

@-webkit-keyframes parpadeo {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>




