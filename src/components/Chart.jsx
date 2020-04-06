import React, { Component } from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'
import Axes from '../components/Axes'
import Bars from './Bars'
import '../App.css'

export default class Chart extends Component {
  constructor() {
    super()
    this.xScale = scaleBand()
    this.yScale = scaleLinear()
  }

  render() {
      const data = this.props.data;
    const margins = { top: 50, right: 20, bottom: 100, left: 60 },
     svgDimensions = { width: 400, height: 400 }

    let maxValue = Math.max(...data.map(d => d.total_conversion))
    
    // scaleBand type
    const xScale = this.xScale
      .padding(0.5)
      // scaleBand domain should be an array of specific values
      // in our case, we want to use movie titles
      .domain(data.map(d => d.age))
      .range([margins.left, svgDimensions.width - margins.right])
  
     // scaleLinear type
    const yScale = this.yScale
       // scaleLinear domain required at least two values, min and max       
      .domain([0, maxValue])
      .range([svgDimensions.height - margins.bottom, margins.top])

    return (
      <svg width={svgDimensions.width} height={svgDimensions.height}>
         <Axes
          scales={{ xScale, yScale }}
          margins={margins}
          svgDimensions={svgDimensions}
        />
        <svg width={svgDimensions.width} height={svgDimensions.height}>
        
        <Bars
          scales={{ xScale, yScale }}
          margins={margins}
          data={data}
          maxValue={maxValue}
          svgDimensions={svgDimensions}
        />
         <svg width={svgDimensions.width} height={svgDimensions.height} >
        
      </svg>
      </svg>
      </svg>
    )
  }
}