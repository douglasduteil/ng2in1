//

import _ from 'lodash';
import camelcase from 'camelcase';
import convertFromTransformers from './convertFromTransformers';

const COMPONENT_TRANSFORMERS = {
  selector: selectorTransformer,
  require: requireTransformer
};

const componentConverter = _.partial(convertFromTransformers, COMPONENT_TRANSFORMERS);

export {componentConverter as componentConfigToDirectiveConfig};

////

// -----------------------------------------------------------------------------
// selector transformer
// -----------------------------------------------------------------------------

function requireTransformer(require) {
  return {
    require: _(require)
      .filter(_.negate(_.isUndefined))
      .map(function (name) {
        if(_.isUndefined(name)){
          return [];
        }

        if (_.isString(name)) {
          return name;
        } else if (!!name._directiveName) {
          // Is a ng2in1 processed component ?
          return name._directiveName;
        }

        return [];
      })
      .flatten()
      .value()
  }
}

// -----------------------------------------------------------------------------
// selector transformer
// -----------------------------------------------------------------------------

// From https://github.com/angular/angular/blob/9f6b6cc50cd3889053cd2810a558af593629c6c2/modules/angular2/src/core/compiler/selector.js
const SELECTOR_REGEXP =
  new RegExp('^([-\\w]+)|' +                   // "tag"
  '(?:\\.([-\\w]+))|' +                        // ".class"
  '(?:\\[([-\\w*]+)(?:=([^\\]]*))?\\])', 'g'); // "[name]", "[name=value]" or "[name*=value]"

const SELECTOR_TYPES = ['E', 'C', 'A'];

function selectorTransformer(selectors) {
  let res = { restrict: '', _directiveName: null };
  let match;

  while (match = SELECTOR_REGEXP.exec(selectors)) {
    // extract the matching part
    match = match.slice(1, 4);

    res.restrict += _(SELECTOR_TYPES)
      .reduce(_.partial(_concatRestrictionLetters, res, match), '');
  }

  return res;
}

function _concatRestrictionLetters(result, match, restriction, letter, index) {
  let matchingName = match[index];
  if (!matchingName) {
    return restriction;
  }

  _hackDirectiveNameExtraction(result, matchingName);

  return restriction === matchingName ? restriction : restriction + letter;
}

function _hackDirectiveNameExtraction(result, matchingName) {
  if (!result._directiveName) {
    result._directiveName = camelcase(matchingName);
  } else if (result._directiveName !== matchingName) {
    throw new Error(`Multiple directive name not implemented yet :P.` +
    ` Directive named "${result._directiveName}" then "${matchingName}"`);
  }
}
