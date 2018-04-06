
const __SWIGGY = {
  api: async id => new Promise((resolve, reject) => fetch(
    'https://www.swiggy.com/dapi/order/all?order_id=' + id,
    {
      credentials: 'include'
    }
  )
  .then(r => r.json())
  .then(({ data }) => resolve(data))
  .catch(reject)),
  fetcher: async (id = '', orders = [], total) => {
    return new Promise(async (resolve, reject) => {
      const { orders: data, total_orders } = await __SWIGGY.api(id)
      orders = orders.concat(data)
      total = total_orders || total
      if (total !== orders.length)
        return resolve(__SWIGGY.fetcher(
          orders[orders.length - 1].order_id,
          orders,
          total,
        ))
      return resolve({
        orders,
        total,
      })
    })
  }
}
