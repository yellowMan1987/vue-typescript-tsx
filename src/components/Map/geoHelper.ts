class geoHelper {
  getMapWindow(nodes:any, map:any, paddingRatio:any) {
    var mapRatio, bb, boundingBox, bbWidth, bbHeight, bbRatio, centerWidth, centerHeight, dimension;
    paddingRatio == null && (paddingRatio = 0);
    mapRatio = this.getMapRatio(map);
    bb = boundingBox = this.getBoundingBox(nodes);
    bbWidth = bb.topRight.lng - bb.bottomLeft.lng;
    bbHeight = bb.topRight.lat - bb.bottomLeft.lat;
    bbRatio = bbWidth / bbHeight;
    if (bbRatio >= mapRatio) {
      centerWidth = bbWidth;
      centerHeight = bbWidth / mapRatio;
    } else {
      centerHeight = bbHeight;
      centerWidth = bbHeight * mapRatio;
    }
    return this.enlargeBox(boundingBox, dimension = {
      width: centerWidth,
      height: centerHeight
    }, paddingRatio);
  }
  getMapRatio(map:any) {
    var container, ratio;
    container = map.getContainer();
    ratio = container.offsetWidth / container.offsetHeight;
    return ratio;
  }
  getBoundingBox(nodes:any) {
    var minLng, minLat, maxLng, maxLat, i$, len$, node, ref$, lng, lat, box;
    minLng = minLat = Number.POSITIVE_INFINITY;
    maxLng = maxLat = Number.NEGATIVE_INFINITY;
    for (i$ = 0, len$ = nodes.length; i$ < len$; ++i$) {
      node = nodes[i$];
      lng = node.x, lat = node.y;
      if (lng < minLng) {
        minLng = lng;
      }
      if (lat < minLat) {
        minLat = lat;
      }
      if (lng > maxLng) {
        maxLng = lng;
      }
      if (lat > maxLat) {
        maxLat = lat;
      }
    }
    box = {
      topRight: {
        lng: maxLng,
        lat: maxLat
      },
      bottomLeft: {
        lng: minLng,
        lat: minLat,
      }
    };
    return box;
  }
  enlargeBox(box:any, dimension:any, paddingRatio:any) {
    var maxLng, maxLat, minLng, minLat, centerLng, centerLat;
    maxLng = box.topRight.lng;
    maxLat = box.topRight.lat;
    minLng = box.bottomLeft.lng;
    minLat = box.bottomLeft.lat;
    centerLng = (minLng + maxLng) / 2;
    centerLat = (minLat + maxLat) / 2;
    dimension = this.enlargeDimension(dimension, 1 / (1 - paddingRatio));
    maxLng = centerLng + dimension.width / 2;
    maxLat = centerLat + dimension.height / 2;
    minLng = centerLng - dimension.width / 2;
    minLat = centerLat - dimension.height / 2;
    box = {
      topRight: {
        lng: maxLng,
        lat: maxLat
      },
      bottomLeft: {
        lng: minLng,
        lat: minLat
      }
    };
    return box;
  }
  enlargeDimension(arg$:any, ratio:any) {
    var width, height;
    width = arg$.width, height = arg$.height;
    return {
      width: width * ratio,
      height: height * ratio
    };
  }
  createNodes(cors:any) {
    var i$, len$, cor, results$ = [];
    for (i$ = 0, len$ = cors.length; i$ < len$; ++i$) {
      cor = cors[i$];
      results$.push({
        camera: {
          coordinates: {
            lng: cor[0],
            lat: cor[1]
          }
        }
      });
    }
    return results$;
  }
  toGeoCoords(arg$:any) {
    var topRight, bottomLeft;
    topRight = arg$.topRight, bottomLeft = arg$.bottomLeft;
    return [bottomLeft, topRight];
  }
  toGeoRectCoords(arg$:any) {
    var topRight, bottomLeft;
    topRight = arg$.topRight, bottomLeft = arg$.bottomLeft;
    return [[bottomLeft.lng, topRight.lat], [topRight.lng, topRight.lat], [topRight.lng, bottomLeft.lat], [bottomLeft.lng, bottomLeft.lat]];
  }
}

export default geoHelper;
