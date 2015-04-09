//

import _ from 'lodash';
import convertFromTransformers from './convertFromTransformers';
import {ng1xModule} from '../ng2in1';

const TEMPLATE_TRANSFORMERS = {
  inline: inlineTransformer,
  directives: directivesTransformer
};

const templateConverter = _.partial(convertFromTransformers, TEMPLATE_TRANSFORMERS);

export {templateConverter as templateConfigToDirectiveConfig};

////

// -----------------------------------------------------------------------------
// selector transformer
// -----------------------------------------------------------------------------

function inlineTransformer(inlineTemplate) {
  return {
    template: inlineTemplate
  };
}

// -----------------------------------------------------------------------------
// directives transformer
// -----------------------------------------------------------------------------

function directivesTransformer(directives, {ngModule}) {
  const directiveModulesName = _(directives)
    .filter(_.negate(_.isString))
    .map(ng1xModule)
    .map(m => m.name)
    .value();

  ngModule.requires = _(ngModule.requires)
    .concat(_.filter(directives, _.isString))
    .concat(directiveModulesName)
    .uniq()
    .value();

  return {};
}
