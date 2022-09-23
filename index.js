import _ from 'lodash'

export const getMean = _.memoize((numbers) => _.sum(numbers) / _.size(numbers))

export const getStandardDeviation = _.memoize((numbers) =>
  Math.sqrt(
    getMean(
      _.map(numbers, (number) =>
        _.multiply(number - getMean(numbers), number - getMean(numbers)),
      ),
    ),
  ),
)

export const getScaled = _.memoize(
  (numbers) =>
  _.map(numbers, (number) =>
    _.divide(number - getMean(numbers), getStandardDeviation(numbers)),
  )
)

export const getStandardScalar = _.memoize(
  (tensor) => (
    _.times(_.size(tensor), (x) => getScaled(tensor[x]))
  )
)
