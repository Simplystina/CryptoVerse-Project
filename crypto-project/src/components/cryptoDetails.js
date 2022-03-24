import React, { useEffect, useState } from 'react'
import LineChart from './line-chart'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify'
import {useParams} from 'react-router-dom'
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi'
import Loader from './loader';

const CryptoDetails = () => {
    const {id} = useParams()
    //console.log(useGetCryptosQuery(1))
    const [datatime, setDatatime] = useState('3y')
    const {data} = useGetCryptoDetailsQuery(id)
    const {data:history} = useGetCryptoHistoryQuery({coinid:id,timeperiod:datatime})
    const [singleData, setSingleData] = useState()
    const [historydata, setHistorydata] = useState()
    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];
   
    useEffect(()=>{
        if (data) {
            setSingleData(data?.data?.coin)
        }
        if(history){
            //console.log(history)
            setHistorydata(history?.data?.history)
            //console.log(historydata)
        }
        
    },[data,history])
    if(!singleData){
        return <Loader></Loader>
    }
    if (singleData) {
        //console.log(singleData)
        const {rank, '24hVolume':volume,
        marketCap,
        allTimeHigh,
        name, 
        symbol,
        description,
        price,
        numberOfMarkets,
        numberOfExchanges,
        supply,
        links,
        change
    } 
        = singleData
        //console.log(millify(volume),'volume')
    
    const update = (e)=>{
        
        setDatatime(e.currentTarget.value)
    }
    //console.log(datatime," out of function")
  return (
    <section className='each-details-section'>
        <div className='cryptodetails-title'>
            <h2>{name} ({symbol}) Price</h2>
            <p>{name} live price in US dollars. View value statistics,
                market cap and supply
            </p>
        </div>
        <form>
            <select  className='form' value={datatime} onChange={update}>
                {time.map((t)=>{
                    return <option key={t} value={t}>{t}</option>
                })}
            </select>
        </form>
        <div className='each-detail-title'>
           <h1>{name} Price Chart</h1>
           <p className='sub-container2-info'>{change}% Current {name} Price: ${millify(price)}</p>
        </div>
        <div className='mychart'>
           <LineChart coindata={historydata} coinname={name} />
        </div>
        <div className='details-container'>
            <div className='sub-coindetails-container1'>
                
                <div className='inner-details-title'>
                    <h2>{name} Value statistics</h2>
                    <p>An overview showing the stats of {name}</p>
                </div>
                <div className='inner-details'>
                    <p>Price to USD</p>
                    <span>${millify(price)}</span>
                </div>
                <div className='inner-details'>
                    <p>Rank</p>
                    <span>{rank}</span>
                </div>
                <div className='inner-details'>
                    <p>24h Volume</p>
                    <span>{millify(volume)}</span>
                </div>
                <div className='inner-details'>
                    <p>Market Cap</p>
                    <span>${millify(marketCap)}</span>
                </div>
                <div className='inner-details'>
                    <p>All-time-high(daily avg)</p>
                    <span>{millify(allTimeHigh?.price)}</span>
                </div>
            </div>
            <div className='sub-coindetails-container2'>
                <div className='inner-details-title'>
                    <h2>Other statistics</h2>
                    <p className='inner-details-title2'>An overview showing the stats of all cryptocurrencies</p>
                </div>
                <div className='inner-details'>
                    <p>Number of Markets</p>
                    <span>{numberOfMarkets}</span>
                </div>
                <div className='inner-details'>
                    <p>Number of Exchanges</p>
                    <span>{numberOfExchanges}</span>
                </div>
                <div className='inner-details'>
                    <p>Approved Supply</p>
                    <span className={supply?.confirmed ? 'success' : 'failure'}>{supply?.confirmed ? <CheckOutlined/> : <StopOutlined/>}</span>
                </div>
                <div className='inner-details'>
                    <p>Total Supply</p>
                    <span>{millify(supply.total || 0)}</span>
                </div>
                <div className='inner-details'>
                    <p>Circulating supply</p>
                    <span>{millify(supply.circulating)}</span>
                </div>
            </div>
        </div>
        <article className='each-coin-info'>
            <article>
               <div>
                  <h2>What is {name}?</h2>
                   <h2 className='underline'></h2>
                </div>
                <div className='coin-info-description'>
                    {HTMLReactParser(description)}
                </div>
            </article>
            
            
            <article>
                <h2>{name} Links</h2>
                 <article className='details-linkurl-container'>
                    {links.map((link,index)=>{
                        const {type, name, url} = link
                        return (
                        <div key={index} className='inner-details-linkurl'>
                            <h3 className='linkurl-text'>{type}</h3>
                            <a className='linkurl' href={url} target="_blank">{name}</a>                            
                        </div>
                    )})}
                </article>
                    
            </article>
        </article>
    </section>
  )
}
 return null
}
export default CryptoDetails
