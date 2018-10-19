console.time('data');
var fs=require('fs');
var jpeg = require('jpeg-js');
var jpegData = fs.readFileSync('test/test2.jpg');
var rawImageData = jpeg.decode(jpegData);
console.log(rawImageData.data.length);
var data=[],tdata=rawImageData.data,w= rawImageData.width,h=rawImageData.height;
for(var i=0;i<h;i++){
    var row=[];
    for(var j=0;j<w;j++){
       let index=  (i*w+j)*4,
        val=0;
        val+= tdata[index++];
        val+=tdata[index++];
        val+=tdata[index];
//tdata[j]
        row.push(val);
    }
    data.push(row);
}
console.log(data.length,data[0].length);
// console.log(data);
console.log(rawImageData.data[2]);
console.timeEnd('data');
console.time('act');

var getHighlightArea = function (xa, ya, w, h, pixels) {
    if (w % 2 === 0 || h % 2 === 0) {
      throw new Error('区域宽高请使用单数值');
    }
    console.info(`图像宽度${xa},高度${ya};选择高亮区域大小面积: ${w}(宽)*${h}(高)`);
    //x，y轴数量,xy轴总数量
    var xc = xa -w+1,
      yc = ya - h+1,
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
            tmptotalval += pixels[ty][tx];
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
var obj= getHighlightArea(w,h,7,7,data);

console.timeEnd('act');
console.log(obj);