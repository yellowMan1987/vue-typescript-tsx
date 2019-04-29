
<template>
  <el-dialog :visible="dialogVisible" class="vtx-webRtc">
    <div ref="videosContainer" class="vtx-webRtc__video-container">
      <video class="vtx-webRtc__video" ref="video"></video>
      <span v-show="isRec" class="vtx-webRtc__isRec"></span>
      <span v-show="isRec" class="vtx-webRtc__isRec-big"></span>
      <span v-show="isRec" class="vtx-webRtc__recTime">{{videoTime}}</span>

      <canvas ref="canvas" class="vtx-webRtc__video-mask" style="background-color: rgba(3,3,3,0%);"></canvas>
    </div>
    <div class="vtx-webRtc__url" ref="videoUrl">
      <!-- <a v-for="(i,index) in urls" :url="i" :key="index">{{index}}</a> -->
    </div>
    <div class="vtx-webRtc__footer">
      <el-button type="primary" @click="start" :disabled="isRec">开始录制</el-button>
      <el-button type="primary" @click="stop">停止录制</el-button>
      <el-button type="primary" @click="save">下载</el-button>
      <el-button type="primary" @click="hide">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import MediaStreamRecorder from "msr";

import "./style.scss";

@Component<WebRtc>({
  components: {},
  props: {},
  computed: {
    videoTime() {
      return `${this.hour > 9 ? this.hour : '0' + this.hour}:${this.minute > 9 ? this.minute : '0' + this.minute}:${this.second > 9 ? this.second : '0' + this.second}`
    }
  },
  methods: {},
  watch: {
    dialogVisible(val) {
      if (val) {
        this.getCamera();
      } else {
        // 关闭摄像头
        this.mediaStreamTrack && this.mediaStreamTrack.stop();
        // this.mediaRecorder = null;
      }
    }
  }
})
export default class WebRtc extends Vue {
  dialogVisible = false;
  timeInterval = 3000;
  mediaRecorder: any;
  mediaStreamTrack: any;
  mediaConstraints = {
    audio: false,
    video: true
  };
  $refs: any;
  urls = [] as string[];
  isRec = false;
  recTimer = null as any;
  millisecond = 0;
  videoTime!: string;
  second = 0;
  minute = 0;
  hour = 0;

  created() {}
  mounted() {}
  beforeDestroy() {
    this.videoRecReset();
  }
  getCamera() {
    // 调用摄像头
    navigator.mediaDevices
      .getUserMedia(this.mediaConstraints)
      .then(stream => {
        // this.drawCanvas();
        this.onMediaSuccess(stream);
      })
      .catch(error => {
        this.onMediaError(error);
      });
  }
  onMediaSuccess(stream: any) {
    let video = this.$refs.video && (this.$refs.video as any);
    this.mediaRecorder = new MediaStreamRecorder(stream);
    this.mediaStreamTrack =
      typeof stream.stop === "function" ? stream : stream.getTracks()[1];
    const videoWidth = this.$refs.videosContainer.clientWidth;
    const videoHeight = this.$refs.videosContainer.clientHeight;
    video.width = videoWidth;
    video.height = videoHeight - 5;
    video = Object.assign(video, {
      controls: false,
      muted: true
    });
    video.srcObject = stream;
    video.play();
    this.mediaRecorder.mimeType = "video/mp4";
    this.mediaRecorder.videoWidth = videoWidth;
    this.mediaRecorder.videoHeight = videoHeight;
    this.mediaRecorder.ondataavailable = (blob: any) => {
      const url = `Open Recorded Video .${Date.now()} Size=${this.bytesToSize(blob.size)} Time=${this.videoTime}`
      this.mediaRecorder.stop();
      // this.upload(blob);
      // 测试保存图片;
      // this.mediaRecorder.save();
      // this.urls.push(url);
      this.viewVideo(blob,url)
    };
    // this.mediaRecorder.start(this.timeInterval);

    //   // setTimeout(function() {
    //   //   this.mediaRecorder && this.mediaRecorder.stop();
    //   // },this.timeInterval)
  }

  viewVideo(blob:any, url:string) {
    const a = document.createElement('a');
    a.target = '_blank';
    a.innerHTML = url;
    a.href = URL.createObjectURL(blob);
    this.$refs.videoUrl.appendChild(a);
    this.$refs.videoUrl.appendChild(document.createElement('hr'));
  }
  drawCanvasText() {
     const ctx = (this.$refs.canvas as any).getContext("2d");

  }
  drawCanvas() {
    const containerHeight =
      this.$refs.videosContainer && this.$refs.videosContainer.clientHeight;
    const containerWidth =
      this.$refs.videosContainer && this.$refs.videosContainer.clientWidth;
    this.$refs.canvas.height = containerHeight - 5;
    this.$refs.canvas.width = containerWidth;
    const ctx = (this.$refs.canvas as any).getContext("2d");
    ctx.beginPath();
    ctx.arc(
      containerWidth / 2,
      containerHeight / 2,
      containerWidth / 2,
      0,
      360,
      false
    );
    ctx.fillStyle = "rgba(3,3,3,0%)";
    ctx.lineWidth = 600;
    ctx.strokeStyle = "rgba(3,3,3,50%)";
    ctx.fill();
    ctx.stroke();
  }
  bytesToSize(bytes: any) {
    const k = 1000;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Bytes";
    const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(k))), 10);
    return (bytes / Math.pow(k, i)).toPrecision(3) + " " + sizes[i];
  }
  // below function via: http://goo.gl/6QNDcI
  getTimeLength(milliseconds: any) {
    const data = new Date(milliseconds);
    return (
      data.getUTCHours() +
      " hours, " +
      data.getUTCMinutes() +
      " minutes and " +
      data.getUTCSeconds() +
      " second(s)"
    );
  }
  onMediaError(e: any) {}

  upload(blob: any) {
    const fd = new FormData();
    fd.append("file", blob, Date.now() + ".mp4");
    // const ajax = new XMLHttpRequest();
    // ajax.open("POST", "http://10.9.240.24:10210/bsp/face/video/upload");
    // ajax.send(fd);
    // ajax.onreadystatechange = function () {
    //   if (ajax.readyState == 4) {
    //     if (ajax.status == 200) {
    //     }
    //   }
    // };
  }
  timer() {
    this.millisecond = this.millisecond + 50;//毫秒

    if (this.millisecond >= 1000) {
      this.millisecond = 0;
      this.second = this.second+1;
    }
    if (this.second >= 60) {
      this.second = 0;
      this.minute = this.minute+1;
    }
    if (this.minute >= 60) {
      this.minute = 0;
      this.hour = this.hour + 1;
    }
  }

  start() {
    this.videoRecReset();
    this.isRec = true;
    this.mediaRecorder.start();
    this.recTimer = setInterval(this.timer,50);
  }
  stop() {
    this.mediaRecorder.stop();
    // this.videoRecReset();
    this.isRec = false;
    clearInterval(this.recTimer);
  }
  save() {
    this.mediaRecorder.save();
    this.stop();
  }

  show() {
    this.dialogVisible = true;
  }

  hide() {
    this.dialogVisible = false;
    this.mediaRecorder.stop();
    this.videoRecReset();
  }

  videoRecReset() {
    this.isRec = false;
    clearInterval(this.recTimer);
    this.recTimer = null;
    this.second = 0;
    this.minute = 0;
    this.hour = 0;
  }
}
</script>

