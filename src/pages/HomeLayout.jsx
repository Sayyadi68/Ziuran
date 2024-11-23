import React, { useState } from 'react'
import { Header, Loading, Navbar, Footer, PhoneMenu } from '../components'
import { Outlet, useNavigation } from 'react-router-dom'

import products from './productsInfo'
// const [productsData, setProductsData] = useState(products)

const HomeLayout = () => {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'
  console.log(products)

  return (
    <div>
      <Header />
      <section className='py-10 '>
        {isLoading ? <Loading /> : <Outlet />}
      </section>
      <Footer />
    </div>
  )
}

export default HomeLayout
