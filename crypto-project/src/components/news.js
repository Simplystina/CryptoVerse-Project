import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptonewsApi'
import { useGetCryptosQuery } from '../services/cryptoApi'
import Loader from './loader';


const News = ({simplified}) => {
  const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';
  const count = simplified? 12 : 50
  
  //console.log(status==='fulfilled')
  const [newsCategory, setNewsCategory] = useState('cryptocurrency')
  const [info, setInfo] = useState()
  const {data : cryptoNews, isFetching} = useGetCryptoNewsQuery({newsCategory:newsCategory, count: count})
  const { data, status } = useGetCryptosQuery(100)
  const [displayText, setDisplayText] = useState('Select Crypto')
  //console.log(cryptoNews.value)

  useEffect(()=>{
    if (data) {
      
      setInfo(data.data.coins)
      console.log(info)
     
    }
    
  },[data])
  //console.log(info)
  const selectCategory = (item)=>{
    if(item ==='all'){
      setNewsCategory("cryptocurrency")
      setDisplayText("All crypto")
      return
    }
    setNewsCategory(item)
    setDisplayText(item)
  }
  
 if(!cryptoNews?.value) return <Loader></Loader>
  return (
    <>
     {!simplified && 
     <li className='dropdown dropdown-6'>
       {displayText}
       <ul className="dropdown_menu dropdown_menu--animated dropdown_menu-6">
            <li onClick={()=>selectCategory('all')} key='ccry' className="dropdown_item">All crypto</li>
            {info&& 
            info.map((item,index)=> <li onClick={()=>selectCategory(item.name)} key={index} className="dropdown_item">{item.name}</li>
            )}
       </ul>
       
      </li>}
    <div className='news-container'>
      { 
        cryptoNews.value.map((news, index)=>{  
          const {url,name, description, image, provider, datePublished } = news
          return <article className='crypto-news-card' key={index}>
             <div className="news-title">
               <h3 className='news-heading'>{name.length>40? name.substring(0,40) : name}</h3>
               <img src={image?.thumbnail?.contentUrl || demoImage} alt=''></img>
             </div>
             <p className='news-desc'>{description.length>200 ? description.substring(0,200) : description}</p>
             <div className='crypto-news-footer'>
               <div className='crypto-news-footer1'>
                  <img src={provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt='company'></img>
                  <p>{provider[0].name}</p>
               </div>
               <span>{moment(datePublished).startOf('hour').fromNow()}</span>
             </div>
          </article>
        })
      }
    </div>
    </>
  )
}

export default News
