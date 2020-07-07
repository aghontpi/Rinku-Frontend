import React from "react"
import { ResponsiveBar } from '@nivo/bar';

const Chart = (props) => {
    const demoData = [{"fname":"index.php","downloads":'200'},{"fname":"indesx.php","downloads":'100'}]
    console.log(props,demoData);
    return(
        props.stats && <ResponsiveBar
            data={props.stats}
            keys={['downloads']}
            indexBy="fname"
            margin={{ top: 10, right: 130, bottom: 50, left: 150 }}
            padding={0.5}
            layout="horizontal"
            colors={{ scheme: 'nivo' }}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            axisTop={null}
            axisRight={null}
            colorBy="index"
            reverse={true}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Total downloads',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 0,
                tickPadding: 3,
                tickRotation: -18,
                legend: '',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            enableLabel={true}
            labelSkipWidth={5}
            labelSkipHeight={5}
            labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
        />
    )
}

export {Chart}