const typeUrlMappings = [
  {
    type: 'swiggy',
    path: '/swiggy',
    name: 'Swiggy',
    children: [
      {
        path: '/swiggy/dashboard',
        name: 'Dashboard',
        isDefault: true,
      },
      {
        path: '/swiggy/spending',
        name: 'Spendings',
        isDefault: false,
      },
      {
        path: '/swiggy/orders-restarunts',
        name: 'Orders & Restarunts',
        isDefault: false,
      },
      {
        path: '/swiggy/payments-delivery',
        name: 'Payments & Delivery',
        isDefault: false,
      },
    ]
  }
]

export {
  typeUrlMappings,
}
