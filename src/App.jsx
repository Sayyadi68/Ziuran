import { createBrowserRouter, NavLink, RouterProvider } from 'react-router-dom'
import './index.css'
import {
  About,
  Contact,
  HomeLayout,
  Landing,
  Products,
  SingleProduct,
  Weblog,
  CurrBlogPage,
} from './pages'
import {
  ProductsCategory,
  BlogGrid,
  FeaturesData,
  HomeSwiper,
} from './components'

import products from './pages/productsInfo'
import blogsData from './pages/blogsTestForHme'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: (
            <>
              <HomeSwiper />

              <FeaturesData />

              <ProductsCategory
                title={'آخرین محصولات فروشگاه'}
                products={products}
                blackSubject={'فروشگاه'}
                redSubject={'جدیدترین محصولات'}
                SubjectPose={''}
                bg_color={''}
                slice={8}
              />

              <ProductsCategory
                title={'تضمین بهترین قیمت در سطح کشور!'}
                products={products}
                blackSubject={'فروشگاه'}
                redSubject={'تخفیف ویژه محصولات'}
                SubjectPose={'center'}
                bg_color={'bg-orange-500'}
                slice={4}
              />

              <ProductsCategory
                title={'محبوب از نگاه شما'}
                products={products}
                blackSubject={'فروشگاه'}
                redSubject={'محبوب ترین محصولات'}
                SubjectPose={''}
                bg_color={''}
                slice={4}
              />

              <ProductsCategory
                title={'پیشنهاد ویژه برای تو'}
                products={products}
                blackSubject={'پیشنهادی'}
                redSubject={'محصولات'}
                SubjectPose={''}
                bg_color={''}
                slice={4}
              />

              <div className='pb-6 px-6 mt-8  align-element '>
                <div className='mb-4 flex flex-row justify-between items-center'>
                  <h1 className='text-3xl font-bold text-[#FF4D6D] '>
                    آخرین مطالب <span className='text-gray-800'>فروشگاه</span>
                  </h1>
                  <NavLink
                    to={'blog'}
                    className='bg-pink-200 transition-all hover:bg-[#FF4D6D] p-3 rounded-full hover:text-white font-bold  text-red-500 text-sm mt-2'
                  >
                    مشاهده مطالب
                  </NavLink>
                </div>
                <BlogGrid blogs={blogsData} />
              </div>
            </>
          ),
        },
        {
          index: true,
          element: <Landing />,
        },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Weblog /> },
        { path: 'about', element: <About /> },
        { path: 'contact', element: <Contact /> },
        { path: 'blog/:id', element: <CurrBlogPage/> },
        { path: 'products/:id', element: <SingleProduct /> },
      ],
    },
  ])
  return <RouterProvider router={router}></RouterProvider>
}

export default App
