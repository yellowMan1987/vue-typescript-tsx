
<template>
  <div class="vtx-videoPlayer">
      <video
        @click="playOrStopVideo"
        ref="video"
        class="vtx-videoPlayer__video"
        :id="playerId">
        <source :src="url" type="video/mp4" />
      </video>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getRandomId, EventBus } from '@/utils/global';
import { swallowEvent, on, off } from '@/utils/dom';
import { debounceByKey } from '@/utils/object';
import { duration } from 'moment';

import './style.scss'

@Component<VideoPlayer>({
  components:{},
  props: {
    videoType: {
      type: String,
      default: 'mp4',
    },
    url: {
      type: String,
      default: '',
    },
  },
  computed: {},
  methods: {},
  watch: {},
})

export default class VideoPlayer extends Vue {
  readonly url!: string;
  readonly videoType!: string;
  playerId!: string;
  videoCanPlay!: boolean;

  videoDataKeyTime =  [
    {
      start: 10 * 1000,
      end: 13 * 1000,
    },
    {
      start: 20 * 1000,
      end: 22 * 1000,
    },
    {
      start: 30 * 1000,
      end: 34 * 1000,
    },
  ];
  playKey = false;

  videoDataKeyIndex = 0;
  sliderValue: number = 0;
  showController = false;
  controllerShowTimer: any;
  prograssChanging: boolean = false;
  videoDuration: number = 0; // 视频总时长  单位秒
  prograssIntervalTimer: any;
  durationStr: string = '00:00';
  currentTimeStr: string = '00:00';
  videoPlayState: boolean = false;

  $refs: any;
  videoEle = null as any;
  loadingInstance = null;


  created() {
    this.playerId = getRandomId();

  }
  mounted() {
    this.$nextTick(() => {
      // rtsp流自动播放，MP4不自动
      this.videoPlayState = this.videoType === 'mp4' ? false : true;
      this.videoEle = this.videoType === 'mp4' ? this.$refs.video : this.$refs.sfVideoPlayer.$refs.video;
      this.videoType === 'mp4' && this.initPlayer();
      this.clearIntervalWhenSliderChange();
    });

  }
  beforeDestroy() {}

  initPlayer() {

  }

// 播放 / 暂停播放
  playOrStopVideo(event: any) {
    event && event.preventDefault();
    event && event.stopPropagation();
    this.clearPrograssIntervalTimer();
    this.videoPlayState = !this.videoPlayState;
    if (!this.videoPlayState) {
      this.videoEle && this.videoEle.pause();
    } else {
      if (this.videoType === 'mp4') {
        this.sliderValueChange();
      } else if (this.videoType === 'rtsp') {
        this.$refs.sfVideoPlayer.initPlayer();
      }
      this.videoEle && this.videoEle.play();
    }
  }
  
  clearIntervalWhenSliderChange() {

  }

  clearPrograssIntervalTimer () {

  }
  sliderValueChange () {
    this.clearPrograssIntervalTimer();
    this.prograssIntervalTimer = setInterval(
      () => {
        this.currentTimeStr = this.calcTime(this.videoEle.currentTime * 1000);
        const rate = this.videoEle.currentTime / this.videoDuration;
        if (rate < 1) {
          this.sliderValue = Math.floor(rate * 10000) / 100;
        } else {
          this.sliderValue = 100;
          this.clearPrograssIntervalTimer();
        }
      },
      16,
    );
  }
  // 计算时间
  calcTime(mileSecond: number) {
    if (mileSecond === Infinity) {
      return '0:0';
    }
    const hours = duration(mileSecond).hours();
    const hoursStr = hours >= 10 ? hours : `0${hours}`;
    const minutes = duration(mileSecond).minutes();
    const minutesStr = minutes >= 10 ? minutes : `0${minutes}`;
    const seconds = duration(mileSecond).seconds();
    const secondsStr = seconds >= 10 ? seconds : `0${seconds}`;
    if (hours) {
      return `${hoursStr}:${minutesStr}:${secondsStr}`;
    }
    return `${minutesStr}:${secondsStr}`;
  }



  // mp4

  // rtsp
}
</script>

<!-- Add "scoped" attribute to limit scss to this component only -->
<style lang="sass" scoped>

</style>
