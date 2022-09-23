import { getStandardScalar } from '../index'
import { matrix, scaled } from './fixtures'

test('getStandardScalar', () => {
  expect(getStandardScalar(matrix)).toStrictEqual(scaled)
})
