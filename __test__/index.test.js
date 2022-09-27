import { fit } from '../index'
import { matrix, output } from './fixtures'

test('fit', () => {
  expect(fit(matrix)).toStrictEqual(output)
})
