import buildNode from './private/build-tree'
import stringifyTree from './private/stringify-tree'

import invariant from 'invariant'

const getGroupQueue = (queue, dim) => {
  let i = 0
  let groupQueue = queue.reduce(
    (r, c) => {
      if (++i <= dim) {
        r.t.push(c)
        if (i === dim) {
          r.r.push(r.t)
          i = 0
          r.t = []
        }
      }

      return r
    },
    {
      r: [],
      t: []
    }
  )

  if (groupQueue.t.length) groupQueue.r.push(groupQueue.t)

  return groupQueue.r
}

export default (arr = [], dim = 2) => {
  invariant(
    Array.isArray(arr) && (Number.isInteger(dim) && dim > 0),
    'invalid parameter'
  )

  let queue = arr.slice(0)
  let root = queue.shift()
  let groupQ = getGroupQueue(queue, dim)
  const getNextGroupFactory = () => groupQ.shift()

  return buildNode([root], getNextGroupFactory)
}

export { stringifyTree }
