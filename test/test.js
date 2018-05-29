var getHighlightAreaPoint = require('../index.js').getHighlightAreaPoint;
getHighlightAreaPoint("test/test.jpg", { width: 19, height: 19 }, function (err, result) {
  if (err) {
    console.error(err);
    return;
  }
  console.time('area');
  console.log(JSON.stringify(result));
  console.timeEnd('area');
});