//

import angular from 'angular';
import _ from 'lodash';

import {
  ComponentAnnotationProcessor,
  TemplateAnnoationProcessor,
  EmptyAnnotationProcessor
  } from './annotationProcessors';

export function ng1xModule(FactoryAsModule, {
  dependencies = [],
  moduleName = FactoryAsModule.name,
  moduleSuffix = 'Module'
} = {}) {

  moduleName = moduleName + moduleSuffix;

  try {

    // Test is the module already exist...
    angular.module(moduleName);

    console.warn(`The module "${moduleName}" already exist...`);
    return angular.module(moduleName);
  } catch (e) {}

  const ngModule = angular.module(moduleName, dependencies);

  //

  const annotationProcessors = [
    new ComponentAnnotationProcessor({ ngModule }),
    new TemplateAnnoationProcessor({ ngModule }),
    new EmptyAnnotationProcessor()
  ];

  //

  FactoryAsModule.annotations = FactoryAsModule.annotations || [];

  const directiveConfig = FactoryAsModule.annotations.reduce((directiveConfig, annotation) => {
    return Object.assign(directiveConfig,
      annotationProcessors
        .filter((processor) => processor.test(annotation))[0]
        .process(annotation, moduleName)
    );
  }, {});

  //

  ngModule.controller(moduleName, FactoryAsModule);
  ngModule.directive(directiveConfig._directiveName, () => directiveConfig);

  ngModule._boostrapingSelector = directiveConfig.selector;

  return ngModule;
}
