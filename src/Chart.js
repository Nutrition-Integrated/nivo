import React from 'react'
import { ResponsivePie } from '@nivo/pie'
import data from './data.json'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveAreaBump } from '@nivo/bump'
import { ResponsiveCirclePacking } from '@nivo/circle-packing'
import { ResponsiveBullet } from '@nivo/bullet'
import { ResponsiveCalendar } from '@nivo/calendar'
import { ResponsiveChoropleth } from '@nivo/geo'
import { ResponsiveChord } from '@nivo/chord'
import { ResponsiveChord } from '@nivo/chord'
import { ResponsiveHeatMap } from '@nivo/heatmap'
import { ResponsiveLine } from '@nivo/line'
import { ResponsiveMarimekko } from '@nivo/marimekko'
import { ResponsiveNetwork } from '@nivo/network'
import { ResponsiveParallelCoordinates } from '@nivo/parallel-coordinates'
import { ResponsiveRadar } from '@nivo/radar'
import { ResponsiveSankey } from '@nivo/sankey'
import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import { ResponsiveStream } from '@nivo/stream'
import { ResponsiveSunburst } from '@nivo/sunburst'
import { ResponsiveSwarmPlot } from '@nivo/swarmplot'
import { ResponsiveTreeMap } from '@nivo/treemap'
import { ResponsiveVoronoi } from '@nivo/voronoi'
import { ResponsiveWaffle } from '@nivo/waffle'

console.log(data)

function Chart() {

    return (
        <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
      
    )
}

export default Chart
