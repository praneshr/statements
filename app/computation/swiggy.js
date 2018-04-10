import moment from 'moment'

const spending = data => {
  const spent = data.map(a => a.order_total)
  const totalTax = data.map(a => a.order_tax).reduce((a, b) => a + b)
  const highestSpent = Math.max(...spent)
  const lowestSpent = Math.min(...spent.filter(a => a !== 0))
  const totalSpent = spent.reduce((a, b) => a + b)
  const monthlySpent = {}
  const graphData = data
  .slice()
  .reverse()
  .map(a => {
    const dateString = moment(a.ordered_time_in_seconds * 1000).format('MMM__YYYY')
    monthlySpent[dateString] = (monthlySpent[dateString] || 0) + a.order_total
    return {
      x: dateString,
      y: a.order_total,
    }
  })

  return {
    graphData,
    highestSpent,
    totalSpent,
    lowestSpent,
    totalTax,
    monthlySpent,
  }
}
const restaurants = data => {
  let restaurantsSpent = {}
  const totalRestaurants = data.map(a => a.restaurant_id)
  const uniqRestaurants = new Set(totalRestaurants)
  data.forEach(e => {
    restaurantsSpent[e.restaurant_name] = (restaurantsSpent[e.restaurant_name] || 0) + e.order_total
  })

  return {
    totalRestaurants: uniqRestaurants.size,
    restaurantsSpent,
  }
}

export default ({ orders, total }) => ({
  spending: spending(orders),
  restaurants: restaurants(orders),
  totalOrders: total,
  to: orders[0].ordered_time_in_seconds,
  from: orders[orders.length - 1].ordered_time_in_seconds,
})
