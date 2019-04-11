import Node from './tree-node'

const stringify = tree => {
  const roots = Array.isArray(tree) ? tree : [tree]
  let t = {}
  roots.forEach(node => {
    t = {
      ...node.toMap(),
      ...t
    }
  })

  return JSON.stringify(t)
}

export default tree => {
  if (Node.isNode(tree) || tree.every(node => Node.isNode(node))) {
    return stringify(tree)
  }

  return ''
}
