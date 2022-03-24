import React from "react"
import {Navbar,  News, Cryptocurrencies, Home, Exchanges, CryptoDetails} from './components/index'
import {Link, Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import { CopyrightOutlined, HeartOutlined} from "@ant-design/icons"

function App() {
  return (
    <>
    <Router>
    <section className='section'>
      <div>
        <Navbar></Navbar>
      </div>
      <div className="content-wrap">
          <div className="contents">
            <Switch>
               <Route exact path='/'>
                  <Home></Home>
               </Route>
              <Route exact path='/news'>
                 <News></News>
              </Route>
              <Route exact path='/cryptocurrency'>
                <Cryptocurrencies></Cryptocurrencies>
              </Route>
              <Route exact path='/exchange'>
                 <Exchanges></Exchanges>
              </Route>
              <Route exact path='/crypto/:id'>
                 <CryptoDetails/>
              </Route>
            </Switch>
          </div>
          <div className="footer">
            <h4>CryptoVerse<br></br>
            All right reserve <span className="footer-copywrite"><CopyrightOutlined/> </span>
            {new Date().getFullYear()} </h4>
            
              <h4>Created with <span className="footer-love"><HeartOutlined/></span> by Dinma</h4>
      
          </div>
      </div>
      </section>
    </Router>
    </>
  )
}
export default App
  