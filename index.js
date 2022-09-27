import _ from 'lodash'

export const mean = _.memoize((ns) => _.sum(ns) / _.size(ns))

export const getStandardDeviation = _.memoize((ns) =>
  Math.sqrt(
    mean(_.map(ns, (n) => _.multiply(n - mean(ns), n - mean(ns))))
  )
)

export const scale = _.memoize((ns) =>
  _.map(ns, (n) => _.divide(n - mean(ns), getStandardDeviation(ns)) || 0)
)

const rorateMatrix = _.memoize((x) =>
  _.map(_.first(x), (_v, i) => _.reverse(_.map(x, (r) => r[i])))
)

const rotateMatrixCounter = _.memoize((x) =>
  _.map(_.first(x), (_v, i) => _.map(x, (r) => r[_.size(r) - 1 - i]))
)

export const getScaled = _.memoize((x) =>
  rotateMatrixCounter(
    _.times(_.size(rorateMatrix(x)), (r) => scale(_.get(rorateMatrix(x), r)))
  )
)

const getMean = _.memoize((x) => _.map(x, (_r, i) => mean(_.get(x, i))))

const getShape = _.memoize((x) => [_.size(x), _.size(rorateMatrix(x))])

const getVariance = _.memoize((x, size) =>
  _.map(
    _.map(x, (r) => _.sum(r)),
    (n) => n / size
  )
)

export const fit = (x) => ({
  shape: getShape(x),
  scaled: getScaled(x),
  mean: getMean(rorateMatrix(x)),
  variance: getVariance(
    _.map(
      _.map(rorateMatrix(x), (r, i) =>
        _.map(r, (n) => n - _.get(getMean(rorateMatrix(x)), i))
      ),
      (r) => _.map(r, (n) => n ** 2)
    ),
    _.size(x)
  )
})
