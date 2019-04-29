import { Component, Vue } from 'vue-property-decorator';
import { getRandomId, EventBus } from '@/utils/global';
import { swallowEvent, on, off } from '@/utils/dom';
import { debounceByKey } from '@/utils/object';
import { duration } from 'moment';

@Component<VtVideoPlayer>({
  props: {
    videoType: {
      type: String,
      default: 'mp4',
    },
    url: {
      type: String,
      default: '../static/video/lol_kda.mp4',
    },
    height: {
      type: Number,
      default: 6,
    },
    width: {
      type: Number,
      default: 8.6,
    },
    poster: {
      type: String,
      default: 'https://yz.lol.qq.com/v1/assets/images/featuredvideocover/shurima-rise-ascended.jpg',
    },
    onlyPlayKey: {
      type: Boolean,
      default: false,
    },
    videoDataKeyTime: {
      type: Array,
    },
  },
  computed: {},
  methods: {},
  watch: {},
})
export default class VtVideoPlayer extends Vue {

  readonly url!: string;
  readonly height!: number;
  readonly width!: number;
  readonly videoType!: string;
  readonly onlyPlayKey!: string;
  readonly videoDataKeyTime!: any[];
  playerId!: string;
  videoCanPlay!: boolean;

  playKey = false;

  videoDataKeyIndex = 0;
  sliderValue: number = 0;
  showController = false;
  controllerShowTimer: any;
  prograssChanging: boolean = false;
  videoDuration: number = 0; // 视频总时长  单位秒
  durationMileSecond: number = 0 // 毫秒
  prograssIntervalTimer: any;
  durationStr: string = '00:00';
  currentTimeStr: string = '00:00';
  videoPlayState: boolean = false;

  $refs: any;
  videoEle = null as any;
  loadingInstance = null;


  render() {
    return (
      <div 
      class="vtx-videoPlayer"
      style={{
        width: `${this.width}rem`,
        height: `${this.height}rem`,
        margin: '0 auto',
      }}
     >
     
      
    </div>
    );
  }


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
  beforeDestroy() {
    this.clearPrograssIntervalTimer();
    if (this.$refs.slider && this.$refs.slider.$el) {
      const slider = this.$refs.slider.$el;
      const sliderButton = slider.getElementsByClassName('el-slider__button-wrapper')[0];
      sliderButton.removeEventListener(
        'mousedown',
        this.clearPrograssIntervalTimer,
        false,
      );
    }
    this.pauseVideo();
  }

  initPlayer() {
    this.videoEle.oncanplay = (event: Event) => {
      // this.initScreenshotsCanvas();
      this.videoCanPlay = true;
      // 获取总时长
      this.videoDuration = this.videoEle.duration;
      this.durationMileSecond = this.videoDuration * 1000;
      this.durationStr = this.calcTime(this.durationMileSecond);
    };

    this.videoEle.onpause = (event: Event) => {
      this.videoPlayState = false;
    };
    this.videoEle.onplay = (event: Event) => {
      this.videoPlayState = true;
    };
  }

  playKeyChange(val: boolean) {
    this.playKey = val;
    if (val) {
      // 后面优化一下这里，做到可以实时播放的时候切换；
      this.resetVideo();
      // this.playVideo();
    }
    if (!val) {
      this.videoDataKeyIndex = 0;
    }
  }

  // 处理进度条变化,不隐藏控制器
  handleProgress(event: any) {
    event && event.preventDefault();
    event && event.stopPropagation();
    this.prograssChanging = true;
    const playProgress = event.offsetX / event.target.clientWidth;
    this.sliderValue = playProgress * 100;
    console.log(this.sliderValue)
    this.videoEle.currentTime = playProgress * this.videoDuration;
    console.log()
  }

  // 处理进度条回传值
  handleProgressChange(value: number) {
    this.clearPrograssIntervalTimer();
    this.videoEle.pause(); // 后期看是拖拽暂停还是继续播放
    const rate = value / 100;
    this.videoEle.currentTime = this.videoEle.duration * rate;
    this.currentTimeStr = this.calcTime(this.videoEle.currentTime * 1000);
    this.sliderValueChange(); // 后期看是拖拽暂停还是继续播放
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

  // 播放关键位置的处理
  intervalControl(time: number) {
    const index = this.videoDataKeyIndex;
    if (this.videoDataKeyIndex <= this.videoDataKeyTime.length - 1 && this.videoDataKeyTime[index].start) {
      if (index === 0) {
        if (time - (this.videoDataKeyTime[index].start / 1000) < 0) {
          this.videoEle.currentTime = (this.videoDataKeyTime[index].start / 1000);
          this.videoDataKeyIndex = this.videoDataKeyIndex + 1;
        }
      } else {
        if (time > (this.videoDataKeyTime[index - 1].end / 1000)) {
          this.videoEle.currentTime = (this.videoDataKeyTime[index].start / 1000);
          this.videoDataKeyIndex = this.videoDataKeyIndex + 1;
        }
      }
    }

    if (time > (this.videoDataKeyTime[this.videoDataKeyTime.length - 1].end / 1000)) {
      this.resetVideo();
    }
  }


  sliderValueChange() {
    this.clearPrograssIntervalTimer();
    this.prograssIntervalTimer = setInterval(
      () => {
        this.currentTimeStr = this.calcTime(this.videoEle.currentTime * 1000);
        const rate = this.videoEle.currentTime / this.videoDuration;
        if (rate < 1) {
          if (this.playKey) {
            // this.intervalControl(Math.ceil(this.videoEle.currentTime));
            this.intervalControl(this.videoEle.currentTime);
          }
          this.sliderValue = Math.floor(rate * 10000) / 100;
        } else {
          this.sliderValue = 100;
          this.clearPrograssIntervalTimer();
        }
      },
      100,
    );
  }

  clearPrograssIntervalTimer(event?: Event) {
    if (event) {
      // 阻止冒泡,防止地图联动
      event.stopPropagation();
    }
    clearInterval(this.prograssIntervalTimer);
  }

  // 在拖拽的时候,清除计时器
  clearIntervalWhenSliderChange() {
    if (this.$refs.slider && this.$refs.slider.$el) {
      const slider = this.$refs.slider.$el;
      const sliderButton = slider.getElementsByClassName('el-slider__button-wrapper')[0];
      sliderButton.addEventListener(
        'mousedown',
        this.clearPrograssIntervalTimer,
        false,
      );
    }
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


  // 播放中的处理
  playing() {
    const video = this.$refs.myPlayer;
    video.addEventListener('timeupdate', () => {
      let timeDisplay;
      // 用秒数来显示当前播放进度
      timeDisplay = Math.floor(video.currentTime);
      // 当视频播放到 4s的时候做处理
      if (timeDisplay === 4) {
        // 处理代码
      }
    }, false);
  }

  // 全屏请求
  handleFullSize(state: boolean) {
    this.videoEle.pause();
    // if (this.videoType === 'mp4') {
    //   this.videoEle.pause();
    // }else {
    //   EventBus.$emit('pauseUpdate');
    // }
    this.videoPlayState = false;
    this.pauseVideo();
    this.$emit('fullSize', state);
  }
  playVideo() {
    const video = this.videoEle;
    video.play();
    this.sliderValueChange();
  }

  pauseVideo() {
    const video = this.videoEle;
    video && video.pause();
    this.clearPrograssIntervalTimer();
    if (this.videoType === 'rtsp') {
      this.$refs.sfVideoPlayer.destroyPlayer();
    }
  }

  resetVideo() {
    if (this.videoType === 'mp4') {
      const video = this.videoEle;
      video.currentTime = 0;
      this.sliderValue = 0;
      this.currentTimeStr = this.calcTime(0);
      this.pauseVideo();
      this.videoDataKeyIndex = 0;
    }
  }
}