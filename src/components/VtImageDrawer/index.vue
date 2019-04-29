<template>
  <div
    ref="container"
    :class="[
      'vtx-imageDrawer',
      drawingRect || drawingPolygon ? 'is-drawing' : ''
    ]"
    :style="{
      width: width ? `${width / 100}rem` : '100%',
      height: height ? `${height / 100}rem` : '100%'
    }"
  >
    <img
      v-if="imageUrl"
      class="vtx-imageDrawer__image"
      :src="imageUrl"
      :style="{
        width: `${canvasStyle.width}px`,
        height: `${canvasStyle.height}px`
      }"
    />
    <img
      v-if="!imageUrl"
      class="vtx-imageDrawer__image"
      :style="{
        width: '250px'
      }"
    />
    <canvas
      ref="canvas"
      class="vtx-imageDrawer__canvas"
      :style="{
        top: `${canvasStyle.top}px`,
        left: `${canvasStyle.left}px`
      }"
      :width="canvasStyle.width"
      :height="canvasStyle.height"
      @click="handleCanvasClick"
      @mousedown="handleCanvasMouseDown"
      @mousemove="handleCanvasMove"
      @mouseup="handleCanvasMouseUp"
    />
    <div
      v-if="$slots.buttons && showButtons"
      class="vtx-imageDrawer__buttons"
      :style="{
        right: `${buttonsPosition.right}px`,
        top: `${buttonsPosition.top}px`
      }"
    >
      <el-button type="primary" size="small">确定</el-button>
      <el-button size="small">取消</el-button>
    </div>
       
  </div>
</template>

<script lang="ts">
import { Component,Vue } from 'vue-property-decorator';
import { debounceByKey } from "@/utils/global";
import PolygonDrawer, {
  DEFAULT_POLYGON_LINE_COLOR,
  DEFAULT_POLYGON_LINE_WEIGHT,
  DEFAULT_POLYGON_LINE_OPACITY,
  DEFAULT_POLYGON_LINE_CONNECT_POINT_RADIUS,
  DEFAULT_POLYGON_MASK_OPACITY,
  IPoint,
} from "@/components/PolygonDrawer";
import { getImageSize } from "@/utils/image";
import { hex2rgba } from "@/utils/format";
import { on, off } from "@/utils/dom";
import './style.scss';

const BUTTON_HEIGHT = 34;

interface IPolygon {
  points: IPoint[];
}

interface IRect {
  leftTop: IPoint;
  rightBottom: IPoint;
}

@Component<ImageDrawaer>({
  props: {
    imageUrl: String,
    width: Number,
    height: Number,
    drawingRect: {
      type: Boolean,
      default: false
    },
    drawingPolygon: {
      type: Boolean,
      default: false
    },
    isFullSize: {
      type: Boolean,
    },
    fromTask: {
      type: Boolean,
    },
    polygons: {
      type: Array,
      default() {
        return [];
      }
    },
    rects: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {

  },
  watch: {
    imageUrl() {
      this.calculateCanvas(() => {
        this.$nextTick(() => {
          this.drawPolygons();
          this.drawRects();
        });
      });
    },
    drawingPolygon(val) {
      this.isDrawingPolygon = val;
    },
    isDrawingPolygon(val) {
      if (val) {
        this.clearPolygon();
        on(document.body, "keyup", this.handleKeyUp);
        this.showButtons = false;
      } else {
        off(document.body, "keyup", this.handleKeyUp);
      }
    },
    drawingRect(val) {
      this.isDrawingRect = val;
    },
    isDrawingRect(val) {
      if (val) {
        this.clearPolygon();
        on(document.body, "keyup", this.handleKeyUp);
        this.showButtons = false;
      } else {
        off(document.body, "keyup", this.handleKeyUp);
      }
    },
    polygons: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.clearCanvas();
          this.drawPolygons();
        });
      }
    },
    rects: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.clearCanvas();
          this.drawRects();
        });
      }
    },
    isFullSize(val) {
      if (!this.fromTask) return;
      this.containerWidth = this.width || this.$refs.container.offsetWidth;
      this.containerHeight = this.height || this.$refs.container.offsetHeight;
      this.calculateCanvas(() => {
        this.$nextTick(() => {
          this.drawPolygons();
          this.drawRects();
        });
      });
    }
  }
})

export default class ImageDrawaer extends PolygonDrawer { 
  $refs!: {
    container: HTMLElement;
    canvas: HTMLElement;
  };
  readonly imageUrl!: string;
  readonly width!: number;
  readonly height!: number;
  readonly polygons!: IPolygon[];
  readonly rects!: IRect[];
  readonly drawingRect!: boolean;
  readonly drawingPolygon!: boolean;
  readonly isFullSize!: boolean;
  readonly fromTask!: boolean;

  
  containerWidth!: number; // 组件宽度
  containerHeight!: number; // 组件高度
  originWidth!: number; // 图片实际宽度
  originHeight!: number; // 图片实际高度
  ratio!: number; // 图片尺寸和组件尺寸的比例

  canvasStyle = {
    width: 0,
    height: 0,
    left: 0,
    top: 0
  };

  canvasContext = {} as any;
  isDrawingRect = false;
  drawRectMoving = false;
  rectStart!: IPoint;
  rectEnd!: IPoint;

  // 画完多边形后出现的按钮位置
  buttonsPosition = {
    top: 0,
    right: 0
  };
  showButtons = false;
  htmlRatio = 1;


mounted() {
    this.containerWidth = this.width || this.$refs.container.offsetWidth;
    this.containerHeight = this.height || this.$refs.container.offsetHeight;
    this.canvasContext = (this.$refs.canvas as any).getContext("2d");
    this.calculateCanvas(() => {
      this.$nextTick(() => {
        this.drawPolygons();
        this.drawRects();
      });
    });
  }

  calculateCanvas(cb:any) {
    this.clearCanvas();
    // 没有图片路径,返回
    if (!this.imageUrl || !this.imageUrl.length) {
      return;
    }
    // 计算 canvas 尺寸和位置
    getImageSize(this.imageUrl).then(result => {
      const { width, height } = result;
      this.originWidth = width;
      this.originHeight = height;
      let cWidth, cHeight, cTop, cLeft;

      // 先得到显示比例和原始比例
      const showRatio = this.containerWidth / this.containerHeight;
      const originRatio = width / height;

      if (originRatio > showRatio) {
        // 如果原始长宽比例比显示的要大，则以显示宽度为 canvas 宽度
        cWidth = this.containerWidth;
        cHeight = cWidth * (1 / originRatio);
        cLeft = 0;
        cTop = (this.containerHeight - cHeight) / 2;
        this.ratio = width / this.containerWidth;
      } else if (originRatio < showRatio) {
        // 如果原始长宽比例比显示的要小，则以显示高度为 canvas 高度
        cHeight = this.containerHeight;
        cWidth = cHeight * originRatio;
        cTop = 0;
        cLeft = (this.containerWidth - cWidth) / 2;
        this.ratio = height / this.containerHeight;
      } else {
        cWidth = this.containerWidth;
        cHeight = this.containerHeight;
        cTop = 0;
        cLeft = 0;
        this.ratio = 1;
      }

      this.htmlRatio = this.width ? this.getHtmlScaleRatio() : 1;
      // let htmlRatio = 1;
      this.canvasStyle.width = cWidth * this.htmlRatio;
      this.canvasStyle.height = cHeight * this.htmlRatio;
      this.canvasStyle.top = cTop * this.htmlRatio;
      this.canvasStyle.left = cLeft * this.htmlRatio;

      cb && cb();
    });
  }

  handleCanvasClick(e:any) {
    e.stopPropagation();
    this.handleClick({
      x: e.offsetX,
      y: e.offsetY
    });
  }

  handleCanvasMove(e:any) {
    e.stopPropagation();
    debounceByKey('imageDrawer', this.canvasMove(e), 300);
  }

  canvasMove(e:any) {
    const point = {
      x: e.offsetX,
      y: e.offsetY
    };
    if (this.drawRectMoving) {
      this.clearCanvas();
      this.drawRect(
        this.rectStart,
        point,
        DEFAULT_POLYGON_LINE_COLOR,
        DEFAULT_POLYGON_LINE_WEIGHT,
        DEFAULT_POLYGON_MASK_OPACITY
      );
    } else {
      this.handleMove(point);
    }
  }

  handleCanvasMouseDown(e:any) {
    e.stopPropagation();
    if (this.isDrawingRect) {
      this.drawRectMoving = true;
      this.rectStart = {
        x: e.offsetX,
        y: e.offsetY
      };
    }
  }

  handleCanvasMouseUp(e:any) {
    e.stopPropagation();
    if (this.isDrawingRect) {
      this.drawRectMoving = false;
      this.rectEnd = {
        x: e.offsetX,
        y: e.offsetY
      };
      if (
        this.rectStart.x === this.rectEnd.x ||
        this.rectStart.y === this.rectEnd.y
      ) {
        this.clearCanvas();
        return;
      }
      this.showFinishButtons("rect", [this.rectStart, this.rectEnd]);
      const val = {
        leftTop: {
          x: Math.min(this.rectStart.x, this.rectEnd.x) * this.ratio / this.htmlRatio,
          y: Math.min(this.rectStart.y, this.rectEnd.y) * this.ratio / this.htmlRatio,
        },
        rightBottom: {
          x: Math.max(this.rectStart.x, this.rectEnd.x) * this.ratio  / this.htmlRatio,
          y: Math.max(this.rectStart.y, this.rectEnd.y) * this.ratio  / this.htmlRatio,
        }
      }
      this.$emit("finish", val);
    }
  }

  drawLine(start:any, end:any, color:any, weight:any, opacity:any) {
    const ctx = this.canvasContext;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = hex2rgba(color, opacity);
    ctx.lineWidth = weight;
    ctx.stroke();
    return {
      start,
      end
    };
  }

  drawCircle(point:any, radius:any, color:any, weight:any, opacity:any) {
    const ctx = this.canvasContext;
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = hex2rgba(color, opacity);
    ctx.fill();
    ctx.lineWidth = weight;
    ctx.strokeStyle = color;
    ctx.stroke();
  }

  drawRect(start:any, end:any, color:any, weight:any, opacity:any) {
    const leftTop: any = {
      x: Math.min(start.x, end.x),
      y: Math.min(start.y, end.y)
    };
    const width = Math.abs(start.x - end.x);
    const height = Math.abs(start.y - end.y);
    const ctx = this.canvasContext;
    ctx.beginPath();
    ctx.rect(leftTop.x, leftTop.y, width, height);
    ctx.fillStyle = hex2rgba(color, opacity);
    ctx.fill();
    ctx.lineWidth = weight;
    ctx.strokeStyle = color;
    ctx.stroke();
  }

  removeMovingLine() {
    // 先清空然后将除了 movingLine 以外的线画回去
    this.clearCanvas();
    this.lines.forEach(line => {
      if (!this.isSameLine(line, this.movingLine)) {
        this.drawLine(
          line.start,
          line.end,
          DEFAULT_POLYGON_LINE_COLOR,
          DEFAULT_POLYGON_LINE_WEIGHT,
          DEFAULT_POLYGON_LINE_OPACITY
        );
      }
    });
    if (this.finishHint) {
      this.showCloseHint();
    }
    this.movingLine = null;
  }

  saveMovingLine(data:any) {
    this.movingLine = data;
  }

  calculateDistance(first: IPoint, second: IPoint) {
    return Math.sqrt(
      Math.pow(first.x - second.x, 2) + Math.pow(first.y - second.y, 2)
    );
  }

  showCloseHint() {
    const point = this.points[0];
    this.drawCircle(
      point,
      10,
      DEFAULT_POLYGON_LINE_COLOR,
      DEFAULT_POLYGON_LINE_WEIGHT,
      DEFAULT_POLYGON_MASK_OPACITY
    );
    this.finishHint = point;
  }

  hideCloseHint() {
    this.finishHint = null;
    this.clearCanvas();
  }

  drawMask(pointArray?:any) {
    const points = pointArray || this.points;
    const ctx = this.canvasContext;
    ctx.fillStyle = hex2rgba(
      DEFAULT_POLYGON_LINE_COLOR,
      DEFAULT_POLYGON_MASK_OPACITY
    );
    ctx.lineWidth = DEFAULT_POLYGON_LINE_WEIGHT;
    ctx.strokeStyle = hex2rgba(
      DEFAULT_POLYGON_LINE_COLOR,
      DEFAULT_POLYGON_LINE_OPACITY
    );
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      const { x, y } = points[i];
      ctx.lineTo(x, y);
    }
    ctx.lineTo(points[0].x, points[0].y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  emitPolygon(points: IPoint[]) {
    this.showFinishButtons("polygon", points);
    this.$emit(
      "finish",
      points.map(p => ({
        x: p.x * this.ratio,
        y: p.y * this.ratio
      }))
    );
  }

  clearPolygon() {
    this.lines = [];
    this.points = [];
    this.removeMovingLine();
    this.hideCloseHint();
  }

  clearCanvas() {
    this.canvasContext.clearRect(
      0,
      0,
      this.canvasStyle.width,
      this.canvasStyle.height
    );
  }

  isSameLine(first:any, second:any) {
    return (
      this.calculateDistance(first.start, second.start) === 0 &&
      this.calculateDistance(first.end, second.end) === 0
    );
  }

  handleKeyUp(e:any) {
    const code = e.keyCode || e.which;
    if (code === 27) {
      this.isDrawingPolygon = false;
    }
  }

  drawPolygons() {
    (this.polygons && this.polygons.length) && this.polygons.forEach(p => {
      this.drawMask(
        p.points.map(point => ({
          x: point.x / this.ratio,
          y: point.y / this.ratio
        }))
      );
    });
  }

  drawRects() {
    this.rects.forEach(r => {
      const { leftTop, rightBottom } = r;
      this.drawRect(
        {
          x: leftTop.x / this.ratio,
          y: leftTop.y / this.ratio
        },
        {
          x: rightBottom.x / this.ratio,
          y: rightBottom.y / this.ratio
        },
        DEFAULT_POLYGON_LINE_COLOR,
        DEFAULT_POLYGON_LINE_WEIGHT,
        DEFAULT_POLYGON_MASK_OPACITY
      );
    });
  }

  showFinishButtons(type:any, points:any) {
    this.calculateButtonPosition(type, points);
    this.$nextTick(() => (this.showButtons = true));
  }

  // 计算按钮显示的位置，临近多边形
  calculateButtonPosition(type:any, points:any) {
    if (this.$slots.buttons) {
      const right = Math.max(...points.map((p:any) => p.x));
      const top = Math.min(...points.map((p:any) => p.y));
      const bottom = Math.max(...points.map((p:any) => p.y));

      this.buttonsPosition.right =
        this.canvasStyle.width - right + this.canvasStyle.left;
      // 根据多边形上下的空隙对比，决定按钮显示在上面还是下面(位置需要加上偏移)
      if (top < this.canvasStyle.height - bottom) {
        this.buttonsPosition.top = bottom + 10 + this.canvasStyle.top;
      } else {
        this.buttonsPosition.top =
          top - (BUTTON_HEIGHT + 10) + this.canvasStyle.top;
      }
    }
  }

  getHtmlScaleRatio() {
    const width = window.innerWidth;
    const HTML = document.getElementsByTagName('html')[0];
    return width / 1920;
  }
}



</script>
