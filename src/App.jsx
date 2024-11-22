import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { About, Contact, HomeLayout, Landing, Products, Weblog } from './pages'
import { ProductsCategory } from './components'
import products from './pages/productsInfo'
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: (
            <ProductsCategory
              title='آخرین محصولات فروشگاه'
              products={products}
            />
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
