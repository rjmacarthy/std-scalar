import _ from 'lodash'

export const getMean = _.memoize((numbers) => _.sum(numbers) / _.size(numbers))

export const getStandardDeviation = _.memoize((numbers) =>
  Math.sqrt(
    getMean(
      _.map(numbers, (number) =>
        _.multiply(number - getMean(numbers), number - getMean(numbers))
      )
    )
  )
)

export const getScaled = _.memoize((numbers) =>
  _.map(numbers, (number) =>
    _.divide(number - getMean(numbers), getStandardDeviation(numbers))
  )
)

const rorateArray = _.memoize((matrix) =>
  _.map(_.first(matrix), (_value, index) =>
    _.reverse(_.map(matrix, (row) => row[index]))
  )
)

const rotateArrayCounter = _.memoize((matrix) =>
  _.map(_.first(matrix), (_value, index) =>
    _.map(matrix, (row) => row[_.size(row) - 1 - index])
  )
)

export const getStandardScalar = _.memoize((matrix) =>
  rotateArrayCounter(
    _.times(_.size(rorateArray(matrix)), (row) =>
      getScaled(_.get(rorateArray(matrix), row))
    )
  )
)
