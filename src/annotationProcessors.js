//

import _ from 'lodash';
import lowerCaseFirst from 'lower-case-first';
import camelcase from 'camelcase';

import {
  Component,
  Template
  } from './annotationTypes';

import {componentConfigToDirectiveConfig} from './convertors/component'
import {templateConfigToDirectiveConfig} from './convertors/template'

export class EmptyAnnotationProcessor {

  test() { return true; }

  process() { return {}; }
}

export class ComponentAnnotationProcessor {

  constructor(opts) { this.opts = opts; }

  test(ann) { return ann instanceof Component; }

  process(directiveConfig, moduleName) {
    directiveConfig = componentConfigToDirectiveConfig(directiveConfig, this.opts);
    return {
      bindToController: true,
      controller: moduleName,
      controllerAs: normalizeControllerAsName(moduleName),
      scope: {},
      ...directiveConfig
    };
  }

}

export class TemplateAnnoationProcessor {

  constructor(opts) { this.opts = opts; }

  test(ann) { return ann instanceof Template; }

  process(directiveConfig) {
    return templateConfigToDirectiveConfig(directiveConfig, this.opts);
  }

}

////

function normalizeControllerAsName(name) {
  return _.flow(lowerCaseFirst, camelcase)(name) + 'Ctrl';
}
