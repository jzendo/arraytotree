import Node from './tree-node'

function getNewNode(t) {
  return Node.getNode(t)
}

/**
 * Build the tree
 *
 * @param {array} owners the tree owner
 * @param {function} getNextGroup get the next group
 */
function buildNodes(owners, getNextGroup) {
  let collectedNextOwners = []

  owners.forEach(owner => {
    let group = getNextGroup()

    if (group) {
      group
        .map(i => new Node(i))
        .forEach(n => {
          owner.getChildren().push(n)
          collectedNextOwners.push(n)
        })
    }
  })

  if (collectedNextOwners.length) {
    buildNodes(collectedNextOwners, getNextGroup)
  }
}

export default (roots, getNextGroup, singleRoot = true) => {
  if (!Array.isArray(roots)) throw new Error('should be a array.')

  roots = roots.map(root => {
    if (!(root instanceof Node)) {
      return getNewNode(root)
    }
  })

  buildNodes(roots, getNextGroup)

  if (singleRoot) return roots[0]
  else return roots
}
