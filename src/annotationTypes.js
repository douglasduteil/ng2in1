//

export class AnnotationType {
  constructor(...args) { Object.assign(this, ...args); }
}

export class Component extends AnnotationType {}
export class Template extends AnnotationType {}
