import { inverseTransform, transform } from '../index'
import { matrix, output, matrixInversed } from './fixtures'

test('transform', () => {
  expect(transform(matrix, ['a', 'b', 'c', 'd', 'e'])).toStrictEqual(output)
})

test('inverseTransform', () => {
  expect(inverseTransform(transform(matrix))).toEqual(matrixInversed)
})
