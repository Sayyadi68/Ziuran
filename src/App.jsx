import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { About, Contact, HomeLayout, Landing, Products, Weblog } from './pages'
import { ProductsCategory, BlogGrid } from './components'

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
              <ProductsCategory
                title='آخرین محصولات فروشگاه'
                products={products}
              />

              <div className="px-6 mt-8">
                <div className="mb-4 flex flex-row justify-between items-center">
                  <h1 className="text-3xl font-bold text-[#FF4D6D] ">
                    آخرین مطالب <span className="text-gray-800">فروشگاه</span>
                  </h1>
                  <button className="bg-pink-200 transition-all hover:bg-[#FF4D6D] p-3 rounded-full hover:text-white font-bold  text-red-500 text-sm mt-2">مشاهده مطالب</button>
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
      ],
    },
  ])
  return <RouterProvider router={router}></RouterProvider>
}

export default App
