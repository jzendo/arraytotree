import buildNode from './private/build-tree'
import stringifyTree from './private/stringify-tree'

import invariant from 'invariant'

const generateGroupQueueFrom = (queue, dim) => {
  let i = 0

  let r = queue.reduce(
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

  // Ensure last
  if (r.t.length) r.r.push(r.t)

  return r.r
}

export default (arr = [], dim = 2) => {
  invariant(
    Array.isArray(arr) && (Number.isInteger(dim) && dim > 0),
    'invalid parameter'
  )

  // Clone queue
  let queue = arr.slice(0)
  // Let the top item be regarded as root
  let root = queue.shift()
  // Make group queue
  let groupQ = generateGroupQueueFrom(queue, dim)

  const getNextGroupFn = () => groupQ.shift()

  return buildNode([root], getNextGroupFn)
}

export { stringifyTree }
