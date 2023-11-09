import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App';
import HomePage from './components/HomePage/HomePage';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
   <Route index={true} element={<HomePage />} />

    <Route path="/event/:_id" element={<HomePage /> } />
    {/* //<Route path="/cart" element={<CartPage /> } /> */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>    
      <ErrorBoundary fallback={<p>Error</p>}>
      <RouterProvider router={router} />
      </ErrorBoundary >

    </HelmetProvider>
  </React.StrictMode>
);

