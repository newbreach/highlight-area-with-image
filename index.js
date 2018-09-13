var getPixels = require("get-pixels")

var getHighlightArea = function (xa, ya, w, h, pixels) {
  if (w % 2 === 0 || h % 2 === 0) {
    throw new Error('区域宽高请使用单数值');
  }
  console.info(`图像宽度${xa},高度${ya};选择高亮区域大小面积: ${w}(宽)*${h}(高)`);
  //x，y轴数量,xy轴总数量
  var xc = xa - Math.floor(w / 2) * 2,
    yc = ya - Math.floor(h / 2) * 2,
    xyc = xc * yc,
    totalval = 0, point = { x: -1, y: -1 },
    tmptotalval = 0,
    x = 0, 
    y = 0, 
    tx = 0, 
    ty = 0;
  console.info(`能够比对的区域数量：${xc}*${yc}=${xyc}`);
  for (x = 0; x < xc; x++) {
    for (y = 0; y < yc; y++) {
      tmptotalval = 0;
      for (tx = x; tx < x + w; tx++) {
        for (ty = y; ty < y + h; ty++) {
          tmptotalval += pixels.get(tx, ty, 0);
          tmptotalval += pixels.get(tx, ty, 1);
          tmptotalval += pixels.get(tx, ty, 2);
        }
      }
      if (tmptotalval > totalval) {
        totalval = tmptotalval;
        point.x = x;
        point.y = y;
      }
    }
  }
  return { tval: totalval, point: point.x === -1 ? null : { x: point.x + Math.floor(w / 2), y: point.y + Math.floor(h / 2) }, area: point.x === -1 ? null : { x1: point.x, y1: point.y, x2: point.x + w, y2: point.y + h } }
};


//获取最亮位置
var getHighlightAreaPoint = function (path, opt = { width: 3, height: 3 }, cb) {
  getPixels(path, function (err, pixels) {
    if (err) {
      return cb(new Error("无效的图片路径"));
    }
    // console.log(pixels);
    let width = pixels.shape[0],
      height = pixels.shape[1];
    //console.log(pixels.get(0, 0, 0, 0));
    let result = getHighlightArea(width, height, opt.width, opt.height, pixels);
    result.center = { x: Math.floor(width / 2), y: Math.floor(height / 2) };
    if (result.point) {
      result.distance = getCenterWithHighlightPoint(result.center, result.point);
    }
    cb(undefined, result);
  });
};
//获取最亮位置离中心点的距离(当前高亮位置中心减去图像中心)
var getCenterWithHighlightPoint = function (p1, p2) {
  return { x: p2.x - p1.x, y: p2.y - p1.y };
}

module.exports = { getHighlightAreaPoint }