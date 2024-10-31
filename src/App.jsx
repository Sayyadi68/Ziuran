import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { HomeLayout, Landing } from './pages'
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
      ],
    },
  ])
  return <RouterProvider router={router}></RouterProvider>
}

export default App
