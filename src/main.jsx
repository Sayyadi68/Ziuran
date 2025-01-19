import store from './store.js'  // تغییرات لازم برای وارد کردن به‌درستی store

import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.jsx'
import './index.css'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ToastContainer position='bottom-right' />
    <App />
  </Provider>
)
