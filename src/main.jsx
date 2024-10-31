import 'react-toastify/dist/ReactToastify.css'
import App from './App.jsx'
import './index.css'
import { createRoot } from 'react-dom/client'
import { store } from './store.js'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ToastContainer position='bottom-right' />
    <App />
  </Provider>
)
