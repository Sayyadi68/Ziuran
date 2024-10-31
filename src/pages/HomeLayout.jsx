import React from 'react'
import { Header, Loading, Navbar } from '../components'
import { Outlet, useNavigation } from 'react-router-dom'

const HomeLayout = () => {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'
  return (
    <div>
      <Header />
      <Navbar />
      <section className='py-20 align-element '>
        {isLoading ? <Loading /> : <Outlet />}
      </section>
    </div>
  )
}

export default HomeLayout
