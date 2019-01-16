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
          <div class="titulo">CSS Terminal</div>
          <div class="vacio"></div>
        </div>
        <p class="texto">{{text}}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Terminal extends Vue {
  text = '' as string;

  mounted() {
    this.escribir("this window was created with CSS3 & JavaScript!");
  }

  escribir(palabras:string) {
    let i = 0;
    let palabra = palabras.split('');
    const that = this;
    let mandale = setInterval(function(){  
      that.text = that.text + palabra[i];
      i++
      if(i===palabra.length){
        clearInterval(mandale);
      }
      
    },200);
  }
}
</script>

<style lang="css" scoped>
.terminal_wrap {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: rgb(150, 100, 225);
  font-family: Consolas;
  font: bold 100% Consolas, Monaco, monospace;
  position: relative;
  height: 50vh;
}
.terminal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(57, 52, 86);
  height: 40vh;
  width: 60vw;
  /* border: 1px solid red; */
  border-radius: 10px 10px 10px 10px;
  min-width: 300px;
}
.titulo {
  opacity: 0.6;
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
  padding: 0.2em;
  background-color: rgb(229, 229, 229);
  /* border: 1px solid red; */
  border-radius: 10px 10px 0px 0px;
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
  left:0;
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




