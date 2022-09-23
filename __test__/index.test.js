import { getStandardScaler } from '../index'
import { matrix, scaled } from './fixtures'

test('getStandardScaler', () => {
  expect(getStandardScaler(matrix)).toStrictEqual(scaled)
})
