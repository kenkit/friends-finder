//---------------------------------------------------------------------------
// File: test.js
//
// Usage: npm test
//---------------------------------------------------------------------------

var should = require('chai').should();
var model = require('../app/model/model.js');

describe('friends-finder: model', function () {
	it('should pass unit tests', function () {
		model.unitTests().should.equal(true);
	});
});
