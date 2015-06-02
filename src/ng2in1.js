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
  factoryName = FactoryAsModule.name,
  moduleSuffix = 'Module'
} = FactoryAsModule.moduleAnnotation || {}) {

  const moduleName = factoryName + moduleSuffix;

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
        .process(annotation, factoryName)
    );
  }, {});

  //

  ngModule.controller(factoryName, FactoryAsModule);
  ngModule.directive(directiveConfig._directiveName, () => directiveConfig);

  ngModule._boostrapingSelector = directiveConfig.selector;

  return ngModule;
}
