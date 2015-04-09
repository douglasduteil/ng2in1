System.config({
  "baseURL": "/",
  "transpiler": "babel",
  "babelOptions": {
    "stage": 0,
    "optional": [
      "runtime"
    ]
  },
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@1.3.15",
    "babel": "npm:babel-core@5.0.12",
    "babel-runtime": "npm:babel-runtime@5.0.12",
    "camelcase": "npm:camelcase@1.0.2",
    "core-js": "npm:core-js@0.8.1",
    "lodash": "npm:lodash@3.6.0",
    "lower-case-first": "npm:lower-case-first@1.0.0",
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:babel-runtime@4.7.16": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@0.8.1": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:lodash@3.6.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:lower-case-first@1.0.0": {
      "lower-case": "npm:lower-case@1.1.2"
    }
  }
});

