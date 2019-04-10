import makeTree, { stringifyTree } from '../index'
import Node from '../private/tree-node'

import { oneLineTrim } from 'common-tags'

test('should be defined', () => {
  expect(typeof makeTree).toBe('function')
})

test('should be ok', () => {
  let q = []
  let tree = makeTree(q)
  let result = tree instanceof Node
  expect(result).toBeTruthy()

  let thrown = () => { makeTree(null) }
  expect(thrown).toThrow()
})

test('should be ok(with default)', () => {
  let q = [10, 9, 8, 5, 3, 1]
  let tree = makeTree(q)
  let result = tree instanceof Node
  expect(result).toBeTruthy()
  expect(tree.title).toBe(10)
  expect(q.length).toBe(6)
})

test('should be ok(with dim = 3)', () => {
  let q = [10, 9, 8, 5, 3, 1]
  let tree = makeTree(q, 3)
  let result = tree instanceof Node
  expect(result).toBeTruthy()
  expect(tree.title).toBe(10)
  expect(tree.getChildren().length).toBe(3)
  expect(q.length).toBe(6)
})

test('stringify tree', () => {
  let q = [10, 9, 8, 5, 3, 1]
  let tree = makeTree(q)
  let stringify = stringifyTree(tree)

  const expected = oneLineTrim`
    {
      "10":{
        "8":{
          "1":{}
        },
        "9":{
          "3":{},
          "5":{}
        }
      }
    }
  `
  expect(stringify).toBe(expected)
})
