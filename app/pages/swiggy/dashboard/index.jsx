import React, { Component } from 'react'
import Page from '@components/page-template'
import CardFull from '@components/dashboard-card-full'
import Barchart from '@components/bar-chart'
import moment from 'moment'

import Data from '../../../context'

class Dashboard extends Component {
  render() {
    const { data } = this.props
    const totalMonths = moment(data.to * 1000).diff(data.from * 1000, 'months')
    const [years, months] = (totalMonths / 12).toFixed(1).toString().split('.')
    const cardFullDetails = [
      {
        label: 'Total Amount spent',
        value: `₹ ${data.spending.totalSpent}`,
      },
      {
        label: 'Total orders',
        value: data.totalOrders,
      },
      {
        label: 'Total Restaurants',
        value: data.restaurants.totalRestaurants,
      },
      {
        label: 'Total Time',
        value: months ? `${years}Y ${months}M` : `${years}Y`,
      },
    ]
    const graphData = {
      x: Object.keys(this.props.data.spending.monthlySpent).map(a => a.split('__')[0]),
      y: Object.values(this.props.data.spending.monthlySpent),
    }
    return (
      <Page title="Dashboard">
        <CardFull data={cardFullDetails} />
        <div styleName="mt-30 mb-30">
          <Barchart data={graphData} label="Spending history"/>
        </div>
      </Page>
    )
  }
}

export default props => <Data.Consumer>
  {value => <Dashboard {...value}/>}
</Data.Consumer>
