import React from 'react'
import { Header, Loading, Navbar ,Footer,Category_typeone} from '../components'
import { Outlet, useNavigation } from 'react-router-dom'

const HomeLayout = () => {
  const products = [
    {
      image: "https://via.placeholder.com/100",
      name: "کرم ضد آفتاب لافار",
      category: "کرم ضد آفتاب",
      oldPrice: "۴۴۳,۰۰۰",
      newPrice: "۱۸۹,۰۰۰",
      discount: 15,
    },
    {
      image: "https://via.placeholder.com/100",
      name: "ادوپرفیوم زنانه روونا",
      category: "ادو پرفیوم",
      oldPrice: "۴۳۸,۰۰۰",
      newPrice: "۳۳۷,۰۰۰",
      discount: 12,
    },
    {
      image: "https://via.placeholder.com/100",
      name: "کرم مرطوب کننده آبرسان",
      category: "آبرسان، مرطوب کننده",
      oldPrice: "۵۰,۰۰۰",
      newPrice: "۴۲,۹۰۰",
      discount: 14,
    },
    {
      image: "https://via.placeholder.com/100",
      name: "ماسک صورت شب بایو آکوا",
      category: "ماسک صورت",
      oldPrice: "۳۸۹,۰۰۰",
      newPrice: "۱۸۹,۰۰۰",
      discount: 25,
    },
    {
      image: "https://via.placeholder.com/100",
      name: "کرم ضد آفتاب لافار",
      category: "کرم ضد آفتاب",
      oldPrice: "۴۴۳,۰۰۰",
      newPrice: "۱۸۹,۰۰۰",
      discount: 15,
    },
    {
      image: "https://via.placeholder.com/100",
      name: "ادوپرفیوم زنانه روونا",
      category: "ادو پرفیوم",
      oldPrice: "۴۳۸,۰۰۰",
      newPrice: "۳۳۷,۰۰۰",
      discount: 12,
    },
    {
      image: "https://via.placeholder.com/100",
      name: "کرم مرطوب کننده آبرسان",
      category: "آبرسان، مرطوب کننده",
      oldPrice: "۵۰,۰۰۰",
      newPrice: "۴۲,۹۰۰",
      discount: 14,
    },
    {
      image: "https://via.placeholder.com/100",
      name: "ماسک صورت شب بایو آکوا",
      category: "ماسک صورت",
      oldPrice: "۳۸۹,۰۰۰",
      newPrice: "۱۸۹,۰۰۰",
      discount: 25,
    },
  ];

  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'
  return (
    <div>
      <Header />
      <Navbar />
      <Category_typeone title="آخرین محصولات فروشگاه" products={products} />
      <section className='py-20 align-element '>
        {isLoading ? <Loading /> : <Outlet />}
      </section>
      <Footer/>
    </div>
  )
}

export default HomeLayout
