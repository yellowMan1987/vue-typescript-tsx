/**
 * 含有画多边形的组件的基类
 */

import vue from 'vue';
// import * as isects from '2d-polygon-self-intersections';
const {
  checkIntersection,
  colinearPointWithinSegment
} = require('line-intersect');


const COR_SCALE = 1000000;
const CLOSE_PIXELS = 15; // 当起点和当前点的距离小于这个像素时，显示闭合提示
export const DEFAULT_POLYGON_LINE_COLOR = '#ffffff';
export const DEFAULT_POLYGON_MOVING_LINE_COLOR = '#ffa500';
export const DEFAULT_POLYGON_WRONG_LINE_COLOR = '#ff0000';
export const DEFAULT_POLYGON_FINISH_LINE_COLOR = '#00ff00';
export const DEFAULT_POLYGON_LINE_WEIGHT = 0.8;
export const DEFAULT_POLYGON_LINE_OPACITY = 0.8;
export const DEFAULT_POLYGON_LINE_CONNECT_POINT_RADIUS = 1;
export const DEFAULT_POLYGON_MASK_OPACITY = 0.2;

export interface  IPoint {
  x: number;
  y: number;
}

export default abstract class PolygonDrawer extends vue {

  isDrawingPolygon = false;
  hasError = false;
  canFinish = false;
  readyToFinish = false;
  points: IPoint[] = [];
  lines: any[] = [];
  movingLine: any; // 虚线的线段
  finishHint: any; // 闭合提示
  mask: any; // 闭合后的半透明遮罩

  protected abstract drawLine(
    start: IPoint,
    end: IPoint,
    color: string,
    weight: number,
    opacity: number,
    hasArrow?: boolean,
  ): any;
  protected abstract removeMovingLine(): void;
  protected abstract saveMovingLine(lineData: any): void;
  protected abstract calculateDistance(first: IPoint, second: IPoint): number;
  protected abstract showCloseHint(): void;
  protected abstract hideCloseHint(): void;
  protected abstract drawMask(): void;
  protected abstract emitPolygon(points: IPoint[]): void;
  abstract clearPolygon(): void;

  protected handleClick(point:IPoint) {
    const points = this.points;
    if (this.isDrawingPolygon && !this.hasError) {
      let thePoint = point;
      if (points.length >= 1) {
        if (this.readyToFinish) {
          thePoint = points[0];
        }
        const line = this.drawLine(
          points[points.length - 1],
          thePoint,
          DEFAULT_POLYGON_LINE_COLOR,
          DEFAULT_POLYGON_LINE_WEIGHT,
          DEFAULT_POLYGON_LINE_OPACITY,
        );
        this.lines.push(line);
      }
      points.push(thePoint);

      // 至少三个点
      this.canFinish = points.length >= 3;

      // 完成绘制
      if (this.readyToFinish) {
        this.finishDrawing();
        this.hideCloseHint();
        this.drawMask();
      }
    }
  }
  // 子类 自己调用
  protected handleMove(point:IPoint) {
    if (this.isDrawingPolygon) {
      this.readyToFinish = false;
      this.hasError = false;
      this.hideCloseHint();
      const points = this.points;
      if (!points.length) return;

      let hasError = false;

      if (points.length > 2) {
        // 大于两个点时，才开始划线
        // 因为经纬度精确到小数点后六位，所以计算时扩大数字以免出现精度问题
        const pointsToDetect = this.points.map(p => [
          p.x * COR_SCALE,
          p.y * COR_SCALE,
        ]);
        pointsToDetect.push([point.x * COR_SCALE, point.y * COR_SCALE]);

        const segments = []; // 构建所有的条线

        for (let i = 0, l = pointsToDetect.length; i < l - 1; i = i + 1) {
          const firstP = pointsToDetect[i]; // 拿到当前的条线的第一个点
          const secondP = pointsToDetect[i + 1]; // 拿到当前的条线的下一个点
          segments.push([
            // 所有的当前条线在一起就构建所有的条线
            firstP,
            secondP,
          ]); // 最终构成如下：[[firstP,secondP],[firstP,secondP],[firstP,secondP],...]
        }

        // 获取最后一条线
        const lastLine = segments.pop() as any;
        const lastPFirst = lastLine[0];
        const lastPSecond = lastLine[1]

        // 拿到最后一条线和第一条进行对比，看是否存在交叉
        segments.forEach((segment: any, ii: number) => {
          // ...[firstP,secondP]
          // 拿到第一条线
          const [firstP, secondP] = segment;
          // 查看是第一条线和最后一条线否交叉，若交叉，checkIntersection返回一个tyle=true的对象
          const result = checkIntersection(
            firstP[0],
            firstP[1],
            secondP[0],
            secondP[1],
            lastPFirst[0],
            lastPFirst[1],
            lastPSecond[0],
            lastPSecond[1],
          );

          const { type, point } = result; // 产生交叉的情况，排除重合情况

          if (
            type === 'intersecting' &&
            (point.x !== lastPFirst[0] || point.y !== lastPFirst[1]) &&
            (point.x !== pointsToDetect[0][0] ||
              point.y !== pointsToDetect[0][1])
          ) {
            hasError = true;
          }
        });
      }

      if (!hasError) {
        if (
          this.canFinish &&
          this.calculateDistance(point, points[0]) < CLOSE_PIXELS
        ) {
          this.readyToFinish = true;
          this.showCloseHint();
          this.drawFinishLine(points[points.length - 1], points[0]);
        } else {
          this.drawMovingLine(points[points.length - 1], point);
        }
      } else {
        this.hasError = true;
        this.drawWrongLine(points[points.length - 1], point);
      }
    }
  }

  private realDrawMovingLine(start: IPoint, end: IPoint, color: string) {
    this.removeMovingLine();
    const line = this.drawLine(
      start,
      end,
      color,
      DEFAULT_POLYGON_LINE_WEIGHT,
      DEFAULT_POLYGON_LINE_OPACITY,
    );
    this.saveMovingLine(line);
  }

  private drawMovingLine(start: IPoint, end: IPoint) {
    this.realDrawMovingLine(start, end, DEFAULT_POLYGON_MOVING_LINE_COLOR);
  }

  private drawWrongLine(start: IPoint, end: IPoint) {
    this.realDrawMovingLine(start, end, DEFAULT_POLYGON_WRONG_LINE_COLOR);
  }

  private drawFinishLine(start: IPoint, end: IPoint) {
    this.realDrawMovingLine(start, end, DEFAULT_POLYGON_FINISH_LINE_COLOR);
  }

  private finishDrawing() {
    this.isDrawingPolygon = false;
    this.removeMovingLine();
    this.emitPolygon(this.points);
  }

  protected drawPolygon(points:IPoint[]) {
    try {
      this.points = points;
      if (points.length >= 3) {
        for (let i = 0, len = points.length; i < len; i = i + 1) {
          const start = points[i];
          const end = i === len - 1 ? points[0] : points[i + 1];
          const line = this.drawLine(
            start,
            end,
            DEFAULT_POLYGON_LINE_COLOR,
            DEFAULT_POLYGON_LINE_WEIGHT,
            DEFAULT_POLYGON_LINE_OPACITY,
          );
          this.lines.push(line);
        }
        this.drawMask();
      }
    } catch (e) {}
  }
}
