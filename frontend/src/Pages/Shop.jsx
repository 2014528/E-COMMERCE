import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'

const Shop = () => {
  return (
    <div>
      <Hero/>
        <Popular/>
        <Offers/>
        <NewCollections/>  
        <NewsLetter/>          
    </div>
  )
}

export default Shop

/* IN shop arrow function  i am mounting all the different components here jitna bhi jsx file(component) bnaate jaa rhe hai sab ko yha mount karte jarhe hai */ 