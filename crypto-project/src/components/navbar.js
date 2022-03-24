import React, {useState, useEffect} from 'react'
import {UnorderedListOutlined } from '@ant-design/icons';
import {Button, Menu, Typography, Avatar} from 'antd'
import icon from '../images/cryptocurrency.png'
import {Link} from 'react-router-dom'


const Navbar = ()=>{
    const [activeMenu, setActiveMenu] = useState(true)
    const [screenSize, setScreenSize] = useState(window.innerWidth)
    const [shownavbar, setShownavbar] = useState(false)
    const checkSize = ()=>{
        //console.log(window.innerWidth)
        return setScreenSize(window.innerWidth)
    }
   useEffect(()=>{
       window.addEventListener('resize', checkSize)
       return ()=>{
           window.removeEventListener('resize', checkSize)
       }
   })

   useEffect(()=>{
       if (screenSize <=800) { 
           //console.log(activeMenu)
           setActiveMenu(false)
       }else{
           setActiveMenu(true)
           //console.log(activeMenu)
       }
   },[screenSize])

   const showNav = ()=>{
       setShownavbar(!shownavbar)
   }
   if (!activeMenu) {
       console.log("Nav menu now")
       return (
        <>
        <div className='nav-container'>
            <div className='nav-logo-container'>
               <img className='nav-icon' src={icon}></img>
               <h2 className='nav-title'>CryptoVerse</h2>
            </div>
            <div className='toggle-links'>
               <span className='toggle-container' onClick={showNav}><UnorderedListOutlined className="toggle" /></span>
            </div>
        </div>
        <div className='nav-links-container'>
        {shownavbar && <ul className='nav-links'>
                <li><Link className='link-name' to='/'>Home</Link></li>
                <li><Link className='link-name' to='/exchange'>exchange</Link></li>
                <li><Link className='link-name' to='/cryptocurrency'>cryptocurrency</Link></li>
                <li><Link className='link-name' to='/news'>News</Link></li>
            </ul>}
        </div>
        </>
        )
   }
    return (
    
    <div className='sidebar-container'>
        <div className='logo-container'>
           <img className='icon' src={icon}></img>
           <h2 className='title'>CryptoVerse</h2>
        </div>
        <ul className='links'>
            <li><Link className='link-name' to='/'>Home</Link></li>
            <li><Link className='link-name' to='/exchange'>exchange</Link></li>
            <li><Link className='link-name' to='/cryptocurrency'>cryptocurrency</Link></li>
            <li><Link className='link-name' to='/news'>News</Link></li>
        </ul>
    </div>)
} 
export default Navbar