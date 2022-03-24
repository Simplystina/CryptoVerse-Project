import React, {useState, useEffect} from 'react'
import { useGetCryptoExchangeQuery } from '../services/cryptoApi'
const Exchanges = () => {
  const {data} = useGetCryptoExchangeQuery()
  console.log(data)
  return (
    <div className='loader'>
      <h1>Opps, no subscription to access this API</h1>
    </div>
  )
}

export default Exchanges
