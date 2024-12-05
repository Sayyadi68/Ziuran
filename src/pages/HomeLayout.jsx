import React, { useState } from 'react'
import { Header, Loading, Navbar, Footer, PhoneMenu , PhoneBottomMenu } from '../components'
import { Outlet, useNavigation } from 'react-router-dom'

import products from './productsInfo'
// const [productsData, setProductsData] = useState(products)

const HomeLayout = () => {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  return (
    <div>
      <Header />
      <section className='py-10  '>
        {isLoading ? <Loading /> : <Outlet />}
      </section>
      <Footer />
      <PhoneBottomMenu/>
    </div>
  )
}

export default HomeLayout
