//

import {
  ComponentAnnotation,
  TemplateAnnotation
  } from '../src/annotations';

import {
  Component,
  Template
  } from '../src/annotationTypes';

describe('annotations', function () {

  describe('ComponentAnnotation', function () {
    it('should exist', function () {
      expect(ComponentAnnotation).to.exist;
    });

    it('should return a function', function () {
      expect(ComponentAnnotation()).to.be.a('function');
    });

    it('should add an "Component" annotation to Foo', function () {
      @ComponentAnnotation()
      class Foo {}

      expect(Foo.annotations)
        .to.exist
        .and
        .to.be.an('array')
        .and
        .to.have.length.above(0);

      expect(Foo.annotations[0])
        .to.exist
        .and
        .to.be.an.instanceof(Component);
    });

  });

  describe('TemplateAnnotation', function () {
    it('should exist', function () {
      expect(TemplateAnnotation).to.exist;
    });

    it('should return a function', function () {
      expect(TemplateAnnotation()).to.be.a('function');
    });

    it('should add an "Template" annotation to Foo', function () {
      @TemplateAnnotation()
      class Foo {}

      expect(Foo.annotations)
        .to.exist
        .and
        .to.be.an('array')
        .and
        .to.have.length.above(0);

      expect(Foo.annotations[0])
        .to.exist
        .and
        .to.be.an.instanceof(Template);
    });
  });
});
