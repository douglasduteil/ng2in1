//

import {
  Component,
  Template
  } from '../src/annotationTypes';

describe('annotationTypes', function () {

  describe('Component', function () {

    it('should exist', function () {
      expect(Component).to.exist;
    });

    it('should assign options to itself', function () {
      expect(new Component({ foo: 'bar' }))
        .to.have.deep.property('foo', 'bar');
    });

  });

  describe('Template', function () {

    it('should exist', function () {
      expect(Template).to.exist;
    });

    it('should assign options to itself', function () {
      expect(new Template({ foo: 'bar' }))
        .to.have.deep.property('foo', 'bar');
    });

  });

});
