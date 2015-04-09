//

import convertFromTransformers from '../../src/convertors/convertFromTransformers';

describe('convertFromTransformers', function () {

  it('should be defined', function () {
    expect(convertFromTransformers).to.exist;
  });

  it('should do nothing with no arguments', function () {
    expect(convertFromTransformers()).to.eql({});
  });

  it('should process given transformers/data', function () {
    expect(convertFromTransformers(
      { foo: function(val){ return { qux: 'foo' + val }; } },
      { foo: 'bar' }
    )).to.eql({ foo: 'bar', qux: 'foobar' });
  });

  it('should process given transformers/data with options', function () {
    expect(convertFromTransformers(
      { foo: function(val, options){ return { qux: 'foo' + options + val }; } },
      { foo: 'bar' },
      '_'
    )).to.eql({ foo: 'bar', qux: 'foo_bar' });
  });

});
