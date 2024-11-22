import React, { useState } from 'react'
import {
  Header,
  Loading,
  Navbar,
  Footer,
  Category_typeone,
  PhoneMenu,
} from '../components'
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
      <Category_typeone title='آخرین محصولات فروشگاه' products={products} />
      <section className='py-20 align-element '>
        {isLoading ? <Loading /> : <Outlet />}
      </section>
      <Footer />
    </div>
  )
}

export default HomeLayout
