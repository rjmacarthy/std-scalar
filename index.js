import _ from 'lodash'

const mean = _.memoize((ns) => _.sum(ns) / _.size(ns))

const getStdDev = _.memoize((ns) =>
  Math.sqrt(mean(_.map(ns, (n) => _.multiply(n - mean(ns), n - mean(ns)))))
)

const scale = _.memoize((ns) =>
  _.map(ns, (n) => _.divide(n - mean(ns), getStdDev(ns)) || 0)
)

const rorate = _.memoize((x) =>
  _.map(_.first(x), (_v, i) => _.reverse(_.map(x, (r) => r[i])))
)

const rotateCounter = _.memoize((x) =>
  _.map(_.first(x), (_v, i) => _.map(x, (r) => r[_.size(r) - 1 - i]))
)

const getShape = _.memoize((x) => [_.size(x), _.size(rorate(x))])

const getScaled = _.memoize((x) =>
  rotateCounter(_.map(rorate(x), (_r, i) => scale(_.get(rorate(x), i))))
)

const getMean = _.memoize((x) => _.map(x, (_r, i) => mean(_.get(x, i))))

const getSqrt = _.memoize((x) => _.map(x, (n) => Math.sqrt(n)))

const getVariance = _.memoize((x, size) =>
  _.map(
    _.map(x, (r) => _.sum(r)),
    (n) => n / size
  )
)

const getCorrection = _.memoize((x) =>
  _.map(rorate(x), (r, i) => _.map(r, (n) => n - _.get(getMean(rorate(x)), i)))
)

const getCorrectionSquared = _.memoize((x) =>
  _.map(getCorrection(x), (r) => _.map(r, (n) => n ** 2))
)

export const transform = _.memoize((x) => ({
  shape: getShape(x),
  scaled: getScaled(x),
  mean: getMean(rorate(x)),
  variance: getVariance(getCorrectionSquared(x), _.size(x)),
  scale: getSqrt(getVariance(getCorrectionSquared(x), _.size(x)))
}))

export const inverseTransform = _.memoize((x) =>
  _.map(x.scaled, (r) =>
    _.map(r, (n, i) => _.multiply(n, _.get(x.scale, i)) + _.get(x.mean, i))
  )
)
