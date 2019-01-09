
<template>
  <el-dialog :visible="dialogVisible" class="vtx-webRtc">
    <div ref="videosContainer" >
      <video class="sf-faceLogin__video" ref="video"></video>
      <canvas ref="canvas" class="sf-faceLogin__video-mask" style="background-color: rgba(3,3,3,0%);"></canvas>
      <el-button type="primary" @click="hide">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import MediaStreamRecorder  from "msr";

import "./style.scss";

@Component<WebRtc>({
  components: {},
  props: {},
  computed: {},
  methods: {},
  watch: {
    dialogVisible(val) {
      if (val) {
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
  created() {
  }
  mounted() {

  }
  befordestoyed() {}
  onMediaSuccess(stream: any) {
    let video = this.$refs.video && (this.$refs.video as any);
    this.mediaRecorder = new MediaStreamRecorder(stream);
    this.mediaStreamTrack =
      typeof stream.stop === "function" ? stream : stream.getTracks()[1];
    const videoWidth = 957;
    const videoHeight = 741;
    video = Object.assign(video, {
      controls: false,
      muted: true
    });
    video.srcObject = stream;
    video.play();
    this.mediaRecorder.mimeType = "video/mp4";
    this.mediaRecorder.videoWidth = videoWidth;
    this.mediaRecorder.videoHeight = videoHeight;
    this.mediaRecorder.ondataavailable = (blob:any) => {
      const url =
        "Open Recorded Video No. " +
        Date.now() +
        " (Size: " +
        this.bytesToSize(blob.size) +
        ") Time Length: " +
        this.getTimeLength(this.timeInterval);
      this.mediaRecorder.stop();
      this.upload(blob);
      // 测试保存图片;
      // this.mediaRecorder.save();
    };
    this.mediaRecorder.start(this.timeInterval);

  //   // setTimeout(function() {
  //   //   this.mediaRecorder && this.mediaRecorder.stop();
  //   // },this.timeInterval)
  }
  drawCanvas() {
    const containerHeight = this.$refs.videosContainer && this.$refs.videosContainer.clientHeight;
    const containerWidth = this.$refs.videosContainer && this.$refs.videosContainer.clientWidth;
    this.$refs.canvas.height = containerHeight;
    this.$refs.canvas.width = containerWidth;
    console.log("=====<containerWidth", containerWidth);
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

  show() {
    this.dialogVisible = true;
  }
  hide() {
    this.dialogVisible = false;
  }
}
</script>

