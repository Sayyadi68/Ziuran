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
      <section className='bg-[#3A3A3A] '>
        <Header />
          {isLoading ? <Loading /> : <Outlet />}
        <Footer />
      </section>
    </div>
  )
}

export default HomeLayout
