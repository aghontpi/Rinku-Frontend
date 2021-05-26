import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../Hooks/app.hook';
import { statsListQueryAction } from '../../Store/stats.store';
import { ResponsiveBar } from '@nivo/bar';

const Stats = () => {
  const dispatch = useAppDispatch();
  const { stats } = useAppSelector((state) => state.stats);

  useEffect(() => {
    dispatch(statsListQueryAction({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ height: '600px' }}>
      {stats && (
        <ResponsiveBar
          key="bar"
          data={stats}
          indexBy="fname"
          keys={['downloads']}
          margin={{ top: 10, right: 130, left: 150, bottom: 50 }}
          padding={0.5}
          layout="horizontal"
          colors={{ scheme: 'nivo' }}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          reverse={true}
          //@ts-ignore
          colorBy="index"
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Total downloads',
            legendPosition: 'middle',
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 3,
            tickRotation: -18,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          enableLabel={true}
          labelSkipWidth={5}
          labelSkipHeight={5}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      )}
    </div>
  );
};

export default Stats;
