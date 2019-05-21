import vue from 'vue';
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios';
import './style.scss';

@Component({
  components: {
  },
  watch: {
    cameraMarkers: {
      deep: true,
      handler(val) {


      },
    },
  }
})

export default class MapDemo extends vue {
  map = {} as any;
  cameraMarkers = [];
  polygonMarkers = [];
  cameraList = [];

  coverageId = 1; // 图层 Id
  currCamera = {
    longitude: 113.875979925,
    latitude: 22.5642081997,
    deviceId: '',
    targetKind: '',
    name: '深圳市区域',
  };

  zoomAndBounds = {} as any;
  polygon = [];

  render() {
    return (
      <div class="vtx-mapDemo">
        <vt-map
          ref="map"
          type="baidu"
          markers={this.cameraMarkers}
          minScale={11}
        >
        </vt-map>
      </div>
    );
  }

  mounted() {
    this.getData();
    this.$nextTick(() => {
      this.map = this.$refs.map;
    });
  }

  getData() {
    axios.get('./shenzhen.json').then((res) => {
      const data = res.data;
      console.info('加载深圳行政区的geojson');
    });
  }

}

export interface IZoomAndBounds {
  zoom: number;
  bounds: {
    ne: IXy;
    sw: IXy;
  };
}

export interface IXy {
  x: number;
  y: number;
}
