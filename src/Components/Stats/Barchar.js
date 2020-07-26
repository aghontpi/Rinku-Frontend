import React,{useEffect, useState} from "react"
import { ResponsiveBar } from '@nivo/bar';
import {useWindowDimensions} from "./../Utils/"

const axisLeft = {
    tickSize: 0,
    tickPadding: 3,
    tickRotation: -18,
    legend: '',
    legendPosition: 'middle',
    legendOffset: -40
}

const withMargins = { left:150, right:130}
const withoutMargins = {left:16, right:16}

const Chart = (props) => {
    const [margins, setMargins] = useState(withMargins)
    const [axisleft, setAxisLeft] = useState(axisLeft);
    const { height, width } = useWindowDimensions();
    //const demoData = [{"fname":"index.php","downloads":'200'},{"fname":"indesx.php","downloads":'100'}]
    useEffect(() => {
//        window.location.reload();
        if(width <= 768){
            setMargins(withoutMargins); 
            setAxisLeft(false);
        } else {
            setMargins(withMargins);
            setAxisLeft(axisLeft)
        }
            
    }, [width])
  
    

    return(
        props.stats && <ResponsiveBar key="1"
            data={props.stats}
            keys={['downloads']}
            indexBy="fname"
            margin={{ top: 10, right: margins.right, bottom: 50, left: margins.left }}
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
            axisLeft={ axisleft }
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