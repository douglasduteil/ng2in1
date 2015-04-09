//

import _ from 'lodash';

/**
 * TODO(douglasduteil): [RENAME][DOCS] Find a simple name and explain what this function is doing...
 *
 * Process a collection with the transformer functions.
 * Same input key and transform function key
 * result to a call of the transformer(inputValue, [options])
 * Final result is a merge of the inputData and the transformation
 *
 * @param {Object} [transformers]
 * @param {Object} [inputData]
 * @param {*} [options]
 * @returns {Object} the
 *
 * @example
 *
 * convertFromTransformers(
 *  { foo: function(val){ return { qux: 'foo' + val }; } },
 *  { foo: 'bar' }
 * )
 * // => { foo: 'bar', qux: 'foobar' }
 */
export default function convertFromTransformers(transformers = {}, inputData = {}, options = {}) {
  return _(inputData)
    // existing transformer
    .pick((val, inputKey) => transformers[inputKey])
    .reduce(function mergeConfigs(result, inputValue, inputDataKey) {
      return Object.assign(
        result,
        transformers[inputDataKey](inputValue, options)
      );
    }, inputData);
}
