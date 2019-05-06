<template>
  <div class="vtx-demo__block">
    <div class="vtx-demo__block-source">
      <slot name="source"></slot>
      <span class="vtx-demo__block-code-icon"
        v-if="!$slots.default"
        @click="showCode=!showCode">
          <span v-if='!showCode'>查看代码</span>
          <span v-else>收起代码</span>
        </span>
    </div>
    <div class="vtx-demo__block-meta"
      v-if="$slots.default">
      <slot></slot>
      <span v-if="$slots.default"
        class="vtx-demo__block-code-icon"
        @click="showCode=!showCode">
          <span v-if='!showCode'>查看代码</span>
          <span v-else>收起代码</span>
      </span>
    </div>
    <div class="vtx-demo__block-code"
      v-show="showCode">
      <slot name="highlight"></slot>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'DemoBlock',
  data () {
    return {
      showCode: false
    }
  }
}
</script>

