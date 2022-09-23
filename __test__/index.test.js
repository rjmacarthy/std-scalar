import { getStandardScalar } from '../index'
import { tensor, scaled } from './fixtures'

test('getStandardScalar', () => {
  expect(getStandardScalar(tensor)).toStrictEqual(scaled)
})
