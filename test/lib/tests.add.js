// adsdk必须使用var定义，不然浏览器端和Node端不能同时处理
var _chai = require('chai');
var assert = _chai.assert;

describe('add 的测试用例', function() {
	it('libTmp.add(1, 2) should return 3', function () {
    assert.equal(libTmp.add(1, 2), 3);
  });
});