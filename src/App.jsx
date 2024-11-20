import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { About, Contact, HomeLayout, Landing, Products, Weblog } from './pages'
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: <Landing />,
        },
        { path: 'products', element: <Products /> },
        { path: 'weblog', element: <Weblog /> },
        { path: 'about', element: <About /> },
        { path: 'contact', element: <Contact /> },
      ],
    },
  ])
  return <RouterProvider router={router}></RouterProvider>
}

export default App
