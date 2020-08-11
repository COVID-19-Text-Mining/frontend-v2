import React, { useState } from 'react';
import { ResponsiveStream } from '@nivo/stream';
import { Get } from 'App/shared/Fetcher';
import { Error, Loading } from 'App/shared/components/Messages';
import { Responsive } from 'semantic-ui-react';

function Mobile({ data, labels }) {
  return (
    <Responsive
      {...Responsive.onlyMobile}
      style={{ height: '100%', width: '100%' }}
    >
      <ResponsiveStream
        data={data}
        keys={labels}
        margin={{ top: 50, right: 0, bottom: 50, left: 60 }}
        axisTop={null}
        axisRight={null}
        xScale={{
          type: 'time',
          format: '%m/%d',
          precision: 'day'
        }}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Days since a month ago',
          legendOffset: 36
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Number of Articles',
          legendOffset: -54
        }}
        offsetType="diverging"
        colors={{ scheme: 'nivo' }}
        fillOpacity={0.85}
        borderColor={{ theme: 'background' }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#2c998f',
            size: 4,
            padding: 2,
            stagger: true
          },
          {
            id: 'squares',
            type: 'patternSquares',
            background: 'inherit',
            color: '#e4c912',
            size: 6,
            padding: 2,
            stagger: true
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#ff6250',
            spacing: 5,
            linewidth: 2,
            rotation: 0
          },
          {
            id: 'dots2',
            type: 'patternDots',
            background: 'inherit',
            color: '#77bb40',
            size: 4,
            padding: 2,
            stagger: true
          },
          {
            id: 'squares2',
            type: 'patternSquares',
            background: 'inherit',
            color: '#ffd977',
            size: 4,
            padding: 2,
            stagger: true
          },
          {
            id: 'lines2',
            type: 'patternLines',
            background: 'inherit',
            color: '#fffc40',
            size: 4,
            padding: 2,
            stagger: true
          },
          {
            id: 'dots3',
            type: 'patternLines',
            background: 'inherit',
            color: '#fffc40',
            size: 4,
            padding: 2,
            stagger: true
          }
        ]}
        fill={[
          {
            match: {
              id: 'Elsevier'
            },
            id: 'dots'
          },
          {
            match: {
              id: 'CORD-19'
            },
            id: 'squares'
          },
          {
            match: {
              id: 'Dimensions Publications'
            },
            id: 'lines'
          },
          {
            match: {
              id: 'PubMed'
            },
            id: 'dots2'
          },
          {
            match: {
              id: 'medrxiv'
            },
            id: 'squares2'
          },
          {
            match: {
              id: 'Social Science Research Network'
            },
            id: 'dots3'
          }
        ]}
        dotSize={8}
        dotColor={{ from: 'color' }}
        dotBorderWidth={2}
        dotBorderColor={{ from: 'color', modifiers: [['darker', 0.7]] }}
        animate={true}
        motionstiffness={90}
        motionDamping={15}
        legends={[]}
      />
    </Responsive>
  );
}

function Desktop({ data, labels }) {
  console.log(data);
  return (
    <Responsive
      minWidth={Responsive.onlyTablet.minWidth}
      style={{ height: '100%', width: '100%' }}
    >
      <ResponsiveStream
        data={data}
        keys={labels}
        margin={{ top: 50, right: 250, bottom: 50, left: 70 }}
        axisTop={null}
        axisRight={null}
        xScale={{
          type: 'time',
          format: '%m/%d',
          precision: 'day'
        }}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Days since a month ago',
          legendOffset: 36
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Number of Articles',
          legendOffset: -54
        }}
        offsetType="diverging"
        colors={{ scheme: 'nivo' }}
        fillOpacity={0.85}
        borderColor={{ theme: 'background' }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#2c998f',
            size: 4,
            padding: 2,
            stagger: true
          },
          {
            id: 'squares',
            type: 'patternSquares',
            background: 'inherit',
            color: '#e4c912',
            size: 6,
            padding: 2,
            stagger: true
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#ff6250',
            spacing: 5,
            linewidth: 2,
            rotation: 0
          },
          {
            id: 'dots2',
            type: 'patternDots',
            background: 'inherit',
            color: '#77bb40',
            size: 4,
            padding: 2,
            stagger: true
          },
          {
            id: 'squares2',
            type: 'patternSquares',
            background: 'inherit',
            color: '#ffd977',
            size: 4,
            padding: 2,
            stagger: true
          },
          {
            id: 'lines2',
            type: 'patternLines',
            background: 'inherit',
            color: '#fffc40',
            size: 4,
            padding: 2,
            stagger: true
          },
          {
            id: 'dots3',
            type: 'patternLines',
            background: 'inherit',
            color: '#fffc40',
            size: 4,
            padding: 2,
            stagger: true
          }
        ]}
        fill={[
          {
            match: {
              id: 'Elsevier'
            },
            id: 'dots'
          },
          {
            match: {
              id: 'CORD-19'
            },
            id: 'squares'
          },
          {
            match: {
              id: 'Dimensions Publications'
            },
            id: 'lines'
          },
          {
            match: {
              id: 'PubMed'
            },
            id: 'dots2'
          },
          {
            match: {
              id: 'medrxiv'
            },
            id: 'squares2'
          },
          {
            match: {
              id: 'Social Science Research Network'
            },
            id: 'dots3'
          }
        ]}
        dotSize={8}
        dotColor={{ from: 'color' }}
        dotBorderWidth={2}
        dotBorderColor={{ from: 'color', modifiers: [['darker', 0.7]] }}
        animate={true}
        motionstiffness={90}
        motionDamping={15}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            translateX: 100,
            itemWidth: 80,
            itemHeight: 15,
            itemTextcolor: '#999999',
            symbolSize: 12,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000000'
                }
              }
            ]
          }
        ]}
      />
    </Responsive>
  );
}

export default function EntriesStream() {
  const { loading, response, error } = Get('/sources/').state();
  const [data, setData] = useState(null);
  const [ds, setDs] = useState('covid19');
  const [display, setDisplay] = useState('daily');

  if (loading) return <Loading message="Loading..." />;
  if (error)
    return <Error message={error.message || `Failed to load sources data`} />;

  data ||
    setData(
      display === 'daily'
        ? response.data[ds][display].slice(1)
        : setData(response.data[ds][display])
    );

  return (
    <div style={{ height: '350px' }} className={'ui center aligned grid'}>
      <Mobile data={data} labels={response.labels} />
      <Desktop data={data} labels={response.labels} />

      <div>
        <div className="ui tiny buttons">
          <button
            className={'ui button ' + (ds === 'all' ? ' active ' : '')}
            value={1}
            onClick={() => {
              setDs('all');
              setData(
                display === 'daily'
                  ? response.data.all[display].slice(1)
                  : response.data.all[display]
              );
            }}
          >
            All Data
          </button>
          <div className="or">&nbsp;</div>
          <button
            className={'ui button ' + (ds === 'covid19' ? ' active ' : '')}
            value={2}
            onClick={() => {
              setDs('covid19');
              setData(
                display === 'daily'
                  ? response.data.covid19[display].slice(1)
                  : response.data.covid19[display]
              );
            }}
          >
            COVID-19 Only
          </button>
        </div>

        <span>&nbsp;</span>

        <div className="ui tiny buttons">
          <button
            className={'ui button ' + (display === 'cumsum' ? ' active ' : '')}
            value={3}
            onClick={() => {
              setDisplay('cumsum');
              setData(response.data[ds].cumsum);
            }}
          >
            Cumulative
          </button>
          <div className="or">&nbsp;</div>
          <button
            className={'ui button ' + (display === 'daily' ? ' active ' : '')}
            value={4}
            onClick={() => {
              setDisplay('daily');
              setData(response.data[ds].daily.slice(1));
            }}
          >
            Daily
          </button>
        </div>
      </div>
    </div>
  );
}
