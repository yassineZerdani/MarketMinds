import React, {useState} from 'react';
import './App.css';
import { Line } from 'react-chartjs-2';

export default function App() {

  const [data,setData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'USD',
            backgroundColor: 'rgb(255, 255, 255)',
            borderColor: 'rgb(255, 99, 132)',
            data: [5, 2, 20, 30, 45]
        },
        {
          label: 'MAD',
          backgroundColor: 'rgb(255, 255, 255)',
          borderColor: 'rgb(255, 99, 0)',
          data: [6, 10, 50, 8, 20, 3, 5, 0]
      }
      ]
  })

  const [daata,setDaata] = useState({});

  const url = new URL(
    "https://api.worldtradingdata.com/api/v1/forex"
  );

  let params = {
      "base": "USD",
      "api_token": "demo",
  };
  Object.keys(params)
      .forEach(key => url.searchParams.append(key, params[key]));

  fetch(url, {
      method: "GET",
  })
      .then(response => response.json())
      .then(json => setDaata(json.data.MAD) );

      //console.log(daata);

  const visualize = () => {
    const mad = parseFloat(daata);
    data.datasets[0].data.push(mad);
    const newData = data;
    console.log(newData,mad);
  }

  return (
    <div className="App">
      <div className="carte">
        <input className="in" type="text" placeholder="forex"/>
        <input className="in" type="text" placeholder="stock"/>
      </div>
      <div className="carte2">
        <h1 className="balence">your balence : 300 $</h1>
        <div className="chart">
          {visualize()}
          <Line data = {data}/>
        </div>
        <button className="butt">buy</button>
        <button className="butt">sell</button>
        <button className="butt">automate</button>
      </div>
    </div>
  );
}