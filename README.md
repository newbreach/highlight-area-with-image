# highlight-area-with-image
从图片中查找出高亮的区域

npm install --save highlight-area-with-image2

代码:
var getHighlightAreaPoint = require('highlight-area-with-image').getHighlightAreaPoint;
getHighlightAreaPoint("test/test.jpg", { width: 19, height: 19 }, function (err, result) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(JSON.stringify(result));
});

结果：
{"tval":68208,"point":{"x":59,"y":34},"area":{"x1":50,"y1":25,"x2":69,"y2":44},"center":{"x":50,"y":40},"distance":{"x":9,"y":-6}}

getHighlightAreaPoint 参数：
url, 支持jpg，png
opt-width,opt-height. 选择区域宽高，请使用单数值。
cb回调函数结果
  result
    tval 检索到的区域像素总和值，留意没有计算透明度。
    point 高亮区域的中心点位置
    area 高亮区域栅栏
    center 图片的中心点
    distance 图片中心点离高亮区域中心点的距离
