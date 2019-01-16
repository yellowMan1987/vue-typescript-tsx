<template>
  <div class="font_wrap">
    <h1>Pure CSS Typing animation.</h1>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class FontInput extends Vue {}
</script>

<style lang="css" scoped>
.font_wrap {
  background: black;
  color: #fff;
}
h1 {
  color: #fff;
  background: black;
  color: #fff;
  font: bold 200% Consolas, Monaco, monospace;
  border-right: 0.1em solid;
  width: 16.5em;
  width: 28ch;
  margin: 2em 1em;
  white-space: nowrap;
  overflow: hidden;
  animation: typing 3s steps(26, end),
    cursor-blink 0.3s step-end infinite alternate;
}
@keyframes typing {
  from {
    width: 0;
  }
}

@keyframes cursor-blink {
  50% {
    border-color: transparent;
  }
}
</style>




