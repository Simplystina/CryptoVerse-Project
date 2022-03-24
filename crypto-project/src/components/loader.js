import React from 'react'
import { Spin } from 'antd'

const Loader = () => {
  return (
    <div className='loader'>
      <Spin className='loading'/>
    </div>
  )
}

export default Loader
