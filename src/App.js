import React from 'react';
import './App.css';

import { useQuery, gql } from '@apollo/client';

import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';


const GET_POSTS = gql`{
  allPosts(count:30000) {
    createdAt
  }
}`;


const App = () => {
  const { data } = useQuery(GET_POSTS);

  if (data) {
    let january = [];
    let february = [];
    let march = [];
    let april = [];
    let may = [];
    let june = [];
    let july = [];
    let august = [];
    let september = [];
    let october = [];
    let november = [];
    let december = [];

    data.allPosts.map(item => {
      let date = new Date(Number(item['createdAt']));
      let month = date.getMonth() + 1;
      if (month === 1) {
        january.push(date)
      }
      if (month === 2) {
        february.push(date)
      }
      if (month === 3) {
        march.push(date)
      }
      if (month === 4) {
        april.push(date)
      }
      if (month === 5) {
        may.push(date)
      }
      if (month === 6) {
        june.push(date)
      }
      if (month === 7) {
        july.push(date)
      }
      if (month === 8) {
        august.push(date)
      }
      if (month === 9) {
        september.push(date)
      }
      if (month === 10) {
        october.push(date)
      }
      if (month === 11) {
        november.push(date)
      }
      if (month === 12) {
        december.push(date)
      }
    })

    const myDates = [{ letter: "A", frequency: january.length },
    { letter: "B", frequency: february.length }, { letter: "C", frequency: march.length },
    { letter: "D", frequency: april.length }, { letter: "E", frequency: may.length },
    { letter: "F", frequency: june.length }, { letter: "G", frequency: july.length },
    { letter: "H", frequency: august.length }, { letter: "I", frequency: september.length },
    { letter: "K", frequency: october.length }, { letter: "L", frequency: november.length },
    { letter: "M", frequency: december.length }];
    //console.log(myDates);

    // Define the graph dimensions and margins
    const width = 500;
    const height = 500;
    const margin = { top: 20, bottom: 20, left: 20, right: 20 };

    // Then we'll create some bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    // We'll make some helpers to get at the data we want
    const x = d => d.letter;
    const y = d => +d.frequency * 100;

    // And then scale the graph by our data
    const xScale = scaleBand({
      range: [0, xMax],
      round: true,
      domain: myDates.map(x),
      padding: 0.4,
    });
    const yScale = scaleLinear({
      range: [yMax, 0],
      round: true,
      domain: [0, Math.max(...myDates.map(y))],
    });

    // Compose together the scale and accessor functions to get point functions
    const compose = (scale, accessor) => data => scale(accessor(data));
    const xPoint = compose(xScale, x);
    const yPoint = compose(yScale, y);



    return (
      <div className="App">
        <h1 style={{ textAlign: 'center' }}>GraphQL 2019 Posts</h1>

        <svg width={width} height={height}>
          {myDates.map((d, i) => {
            console.log(d, i)
            const barHeight = yMax - yPoint(d);
            return (
              <Group key={`bar-${i}`}>
                <Bar
                  x={xPoint(d)}
                  y={yMax - barHeight}
                  height={barHeight}
                  width={xScale.bandwidth()}
                  fill="#fc2e1c"
                />
              </Group>
            );
          })}
        </svg>

      </div>
    );
  } else {
    return <div className="App">
      <h1 style={{ textAlign: 'center' }}>GraphQL 2019 Posts</h1>
      <p>Loading...</p>
    </div>
  }
}

export default App;