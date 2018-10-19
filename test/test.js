var getHighlightAreaPoint = require('../index.js').getHighlightAreaPoint;
 console.time('area');
getHighlightAreaPoint("test/test2.jpg", { width: 7, height: 7 }, function (err, result) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(JSON.stringify(result));
  console.timeEnd('area');
});