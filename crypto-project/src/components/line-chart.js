import React, { useEffect, useState } from 'react'
import { Line} from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto';
const LineChart = ({coindata, coinname}) => {
  
  const coinPrice = []
  const coinTimestamp = []
  const [userData, setUserData] = useState({
    labels : [],
    datasets : [],
    backgroundColor :'green',
    borderColor :'green'
  })
  const updateChart = ()=>{
    for (let i = 0; i < coindata?.length; i++) {
      coinPrice.push(coindata[i].price)
      
      
    }
    for (let i = 0; i < coindata?.length; i += 1) {
      //console.log(coindata[i].timestamp)
      coinTimestamp.push(new Date(coindata[i].timestamp).toLocaleDateString());
    }
    setUserData({ ...userData,
      labels : coinTimestamp,
      datasets : [{
        label : coinname,
        data: coinPrice,
        backgroundColor :'green',
        borderColor :'green'}]
      })
   
  }
   useEffect(()=>{
     updateChart()
     
   },[coindata])
  
  
  return (
    <>
    <div>
      <Line data={userData}/>
    </div>
     
    </>
     
  
  )
}
export default LineChart
