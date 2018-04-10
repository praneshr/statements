import React, { Component } from 'react'
import ReactCSS from 'react-css-modules'
import { Bar } from 'react-chartjs-2'
import S from '@styles'

import s from './styles'

@ReactCSS({ ...S, ...s }, { allowMultiple: true })
class BarChart extends Component {
  render() {
    const {
      data,
      label,
    } = this.props
    const graphData = (canvas) => {
      const ctx = canvas.getContext("2d")
      var purple_orange_gradient = ctx.createLinearGradient(0, 0, 0, 250);
      purple_orange_gradient.addColorStop(0, '#5552FF');
      purple_orange_gradient.addColorStop(1, '#8E8AFF');
      return {
        labels: data.x,
        datasets: [
          {
            backgroundColor: purple_orange_gradient,
						hoverBackgroundColor: purple_orange_gradient,
            data: data.y,
          },
        ],
      }
    }
    const options = {
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
              color: '#E9E9FB',
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              color: '#E9E9FB',
            },
            categorySpacing: 0,
          },
        ],
      },
      legend: {
        display: false,
      },
      animation: {
        duration: 700,
      },
    }
    return (
      <div styleName="bar-chart card card-info">
        <div styleName="label">{label}</div>
        <div styleName="chart">
          <Bar data={graphData} height={400} options={options}/>
        </div>
      </div>
    )
  }
}

export default BarChart
