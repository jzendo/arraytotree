/**
 * @class Node
 */
export default class Node {
  constructor(title, children) {
    this.title = title
    this.children = Array.isArray(children) ? children : []
  }

  getChildren() {
    return this.children
  }

  addChildren(...nodes) {
    nodes.forEach(node => {
      this.getChildren().push(node)
    })
  }

  toMap() {
    let childrenMap = this.getChildren().reduce((r, c) => {
      r = { ...c.toMap(), ...r }
      return r
    }, {})

    return {
      [String(this.title)]: childrenMap
    }
  }

  static getNode(t) {
    return new Node(t)
  }

  static isNode(t) {
    return t && t instanceof Node
  }
}
