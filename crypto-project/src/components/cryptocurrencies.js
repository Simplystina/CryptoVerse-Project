import React, { useEffect, useState } from 'react'
import millify from 'millify'
import {Link} from 'react-router-dom'
import { useGetCryptosQuery } from '../services/cryptoApi'
import Loader from './loader'

const Cryptocurrencies = ({simplified}) => {
  const count = simplified? 10 : 100
  const {data, isFetching} = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState([])
  const [search, setSearch] = useState('')
  useEffect (()=>{
    if(data){
      setCryptos(data.data.coins)
    }
  },[data])
  if (!cryptos) {
    return <Loader></Loader>
  }
  
  if (cryptos){
    const filterData = (e)=>{
      setSearch(e.target.value)
      const filteredtext = data.data.coins.filter((coin)=>{
        return coin.name.toLowerCase().includes(search)
      })
      setCryptos(filteredtext)
      
    }
   
  return (
    <>
    
   {!simplified && <div className='search-crypto'>
      <input type='text' placeholder='Search cryptocurrency'
      value={search}
      onChange={filterData}
      ></input>
    </div> }
    <div className='crypto-card-container'>
      {cryptos.map((crypto)=>{
        
        const {uuid, name, price, marketCap, rank,iconUrl, change} = crypto
        return <article key={uuid} className='crypto-card'>
          <Link className='crypto-card-link' to={`/crypto/${uuid}`}>
          <div className='crypto-card-title'>
            <h4>{rank}. {name}</h4>
            <img className='icon-image' src={iconUrl}></img>
          </div>
          <div className='crypto-card-text'>
            <p>Price {millify(price)}</p>
            <p>MarketCap {millify(marketCap)}</p>
            <p>Daily Change {change}%</p>
          </div>
          </Link>
          
        </article>
      })
      }
    </div>

    </>
  )
}
return null
}



export default Cryptocurrencies
