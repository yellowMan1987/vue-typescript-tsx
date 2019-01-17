
<template>
  <div v-show="visible" class="vtx-globalAlarm">
    <div
      v-if="isAlarmEnd"
      class="alarm-image image"
      :style="{backgroundImage: `url(${alarmImages[alarmNum]})`,}"
    ></div>
    <div
      v-if="!isAlarmEnd"
      class="alarm-image image ass"
      :style="{backgroundImage: `url(${enter})`,}"
    ></div>
    <div
      v-if="isAlarmEnd"
      class="vtx-globalAlarm__next-button button"
      @click="next"
    >
      <span>NEXT</span>
    </div>
    <div
      v-if="isAlarmEnd"
      class="vtx-globalAlarm__next-button button"
      @click="hide"
    >
      <span>CONFIRM</span>
    </div>
    <div
      v-if="!isAlarmEnd"
      class="enter-image image button"
      :style="{backgroundImage: `url(${leve})`}"
      @click="hide"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import "./style.scss";

@Component<GlobalAlarm>({
  components: {},
  props: {},
  computed: {},
  methods: {},
  watch: {}
})
export default class GlobalAlarm extends Vue {
  visible = true;
  isAlarmEnd = true;
  alarmNum = 0;
  alarmImages = [
    "http://foss.oss-cn-shenzhen.aliyuncs.com/images/alarmCard/6a9d95529822720ec2eed0c378cb0a46f21fab55.jpg",
    "http://foss.oss-cn-shenzhen.aliyuncs.com/images/alarmCard/6c4e47a7d933c895b28eb3bfd31373f0800200ef.jpg",
    "http://foss.oss-cn-shenzhen.aliyuncs.com/images/alarmCard/6fbd942397dda14448b54776b0b7d0a20df48624.jpg",
    "http://foss.oss-cn-shenzhen.aliyuncs.com/images/alarmCard/ac961b178a82b90136d1e8f7718da9773812ef64.jpg",
    "http://foss.oss-cn-shenzhen.aliyuncs.com/images/alarmCard/ce21d41373f08202d50c53fb49fbfbeda9641bc6.jpg",
    "http://foss.oss-cn-shenzhen.aliyuncs.com/images/alarmCard/d0768201a18b87d62b593edb050828381e30fd41.jpg",
    "http://foss.oss-cn-shenzhen.aliyuncs.com/images/alarmCard/e4fea1c27d1ed21b4d643c21af6eddc450da3f2a.jpg",
    "http://foss.oss-cn-shenzhen.aliyuncs.com/images/alarmCard/55bb2a2eb9389b50bb4af2968735e5dde6116e23.jpg",
    "http://foss.oss-cn-shenzhen.aliyuncs.com/images/alarmCard/f441d10735fae6cd22bcbe530cb30f2442a70f65.jpg",
    "http://foss.oss-cn-shenzhen.aliyuncs.com/images/alarmCard/5690e3cd7b899e5143f23fd240a7d933c9950d65.jpg",
  ];
  enter = "http://foss.oss-cn-shenzhen.aliyuncs.com/images/alarmCard/7c5aec24b899a901bc01aaf01f950a7b0308f5af.jpg" ;  // 安全出口
  leve =  "http://foss.oss-cn-shenzhen.aliyuncs.com/images/alarmCard/d33bfd198618367af5d13eec2d738bd4b31ce515.jpg"; // 结尾
  stops = [

  ];


  created() {}
  mounted() {}
  beforeDestroy() {}
  show() {
    this.visible = true;
  }
  hide() {
    this.visible = false;
  }
  next() {
    if (this.alarmNum <= 8) {
      this.alarmNum ++ ;
    } else {
      this.isAlarmEnd = false;
      this.alarmNum = 0 ;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit scss to this component only -->
<style lang="sass" scoped>

</style>
