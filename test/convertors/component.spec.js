//

import {componentConfigToDirectiveConfig} from '../../src/convertors/component';

describe('componentConfigToDirectiveConfig', function () {


  it('should be defined', function () {
    expect(componentConfigToDirectiveConfig).to.exist;
  });

  it('should do nothing with no arguments', function () {
    expect(componentConfigToDirectiveConfig()).to.eql({});
  });

  describe('selector transformer', function () {

    it('should process given transformers/data', function () {
      expect(componentConfigToDirectiveConfig(
        { selector: 'bar' }
      )).to.eql({
          selector: 'bar',
          restrict: 'E',
          _directiveName: 'bar'
        });
    });

  })

});
