import React, { useEffect } from 'react';
import './App.css';

import { useQuery, gql } from '@apollo/client';


const GET_POSTS = gql`{
  allPosts(count:20000) {
    createdAt
  }
}`;

const App = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (!data) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error :(</p>;
  }

  const myDates = [];
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
  console.log(january.length, february.length, march.length, april.length, may.length, june.length,
    july.length, august.length, september.length, october.length, november.length, december.length);



  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>GraphQL Posts</h1>
      {loading ? <p>Loading...</p> : <p>MY ITEMS !!!</p>}
    </div>
  );
}

export default App;
