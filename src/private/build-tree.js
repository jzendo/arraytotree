import Node from './tree-node'
import invariant from 'invariant'

function newNode(t) {
  return Node.getNode(t)
}

/**
 * Build the tree-like struct
 *
 * @param {array} nodeOwners the tree owner
 * @param {function} getNextGroupFn get the next group
 */
function buildTreeStruct(nodeOwners, getNextGroupFn) {
  let maybeNextNodeOwners = []

  nodeOwners.forEach(owner => {
    let group = getNextGroupFn()

    if (group) {
      group
        .map(i => new Node(i))
        .forEach(n => {
          owner.getChildren().push(n)
          maybeNextNodeOwners.push(n)
        })
    }
  })

  if (maybeNextNodeOwners.length) {
    buildTreeStruct(maybeNextNodeOwners, getNextGroupFn)
  }
}

export default (roots, getNextGroupFn, retunAsSingleRoot = true) => {
  invariant(Array.isArray(roots), 'should be a array.')

  roots = roots.map(root => {
    if (!(root instanceof Node)) {
      return newNode(root)
    }
  })

  buildTreeStruct(roots, getNextGroupFn)

  if (retunAsSingleRoot) return roots[0]
  else return roots
}
