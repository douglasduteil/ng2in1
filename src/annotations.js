//

import {
  Component,
  Template
  } from './annotationTypes';

export const ComponentAnnotation = _defaultAnnotationDecorator(Component);
export const TemplateAnnotation = _defaultAnnotationDecorator(Template);

////

function _defaultAnnotationDecorator(AnnotationClass) {
  return function (options) {
    return _appendToTargetAnnotations
      .bind(null, new AnnotationClass(options));
  };
}

function _appendToTargetAnnotations(annotation, target) {
  target.annotations = target.annotations || [];
  target.annotations.push(annotation);
}
