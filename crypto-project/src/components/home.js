import React from 'react'
import PropTypes from 'prop-types'
import Loader from './loader'
import millify from 'millify'
import {Link} from 'react-router-dom'
import { useGetCryptosQuery } from '../services/cryptoApi'
import {Cryptocurrencies, News } from './index'
const Home = props => {
  const {data, isFetching} = useGetCryptosQuery(10)
  if (isFetching) {
    return <Loader></Loader>
  }
  if (data) {
  const stat = data.data.stats
  const {total,
    total24hVolume,
    totalExchanges,
    totalMarketCap,
    totalMarkets} = stat
  return (
    <>
    <div className='home-container'>
    <h1 className='heading'>Global Crypto Stats</h1>
    <div className='data-stats'>
      <h4> Total Cryptocurrencies <br></br><span>{total}</span></h4>
      <h4> Total Exchanges <br></br><span>{millify(totalExchanges)}</span></h4>
      <h4> Total Market Cap <br></br><span>${millify(totalMarketCap)}</span></h4>
      <h4> Total 24h Volume <br></br><span>${millify(total24hVolume)}</span></h4>
      <h4> Total Markets<br></br><span>{millify(totalMarkets)}</span></h4>
    </div> 
    <div className='heading-two'>
      <h2>Top 10 cryptocurrencies in the world!</h2>
      <h3><Link to='/cryptocurrency'>Show more</Link></h3>
    </div>
    <Cryptocurrencies simplified></Cryptocurrencies>
    <div className='heading-two'>
      <h2>Latest Crypto News</h2>
      <h3><Link to='/news'>Show more</Link></h3>
    </div>
    <News simplified></News>
    </div>
    </>
  )
}
return null

}

export default Home
