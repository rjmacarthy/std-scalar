import { inverseTransform, transform } from '../index'
import { matrix, output, matrixInversed } from './fixtures'

test('transform', () => {
  expect(transform(matrix)).toStrictEqual(output)
})

test('inverseTransform', () => {
  expect(inverseTransform(transform(matrix))).toEqual(matrixInversed)
})