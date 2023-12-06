import React from 'react'
import Bannerslider from '../components/bannerslider/Bannerslider'
import Biddingoffer from '../components/bidding/Biddingoffer'
import Topstample from "../components/top-stample/Topstample.js";

const Home = () => {
  return (
    <div className='wrapper'>
        <Bannerslider />
        <Biddingoffer />
        <Topstample />
    </div>
  )
}

export default Home