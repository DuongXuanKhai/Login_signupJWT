import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider as StoreProvider } from 'react-redux'
import store from './redux/store.js'
ReactDOM.createRoot(document.getElementById('root')).render(
 <StoreProvider store={store}>
  <App/>
 </StoreProvider>,
)
