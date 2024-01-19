import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './components/Login.jsx'
import CssBaseline from '@mui/material/CssBaseline';
import Cart from './components/Cart.jsx';
import Orders from './components/Orders.jsx';
import BookStore from './components/BookStore.jsx';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store'

const router = createBrowserRouter([
  {
    path: '/',
    element: <BookStore/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/cart',
    element: <Cart/>
  },
  {
    path: '/orders',
    element: <Orders/>
  },
  {
    path: '*',
    element: <Navigate to="/"/>
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CssBaseline />
      <RouterProvider router={router}/>
    </PersistGate>
  </Provider>
)
