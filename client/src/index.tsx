import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App';
import HomePage from './pages/HomePage/HomePage';
import EventPage from './pages/EventPage';
import LocationPage from './pages/LocationPage';


const router = createBrowserRouter(
  createRoutesFromElements(
    
    <Route path="/" element={<App />}>
    <Route index={true} element={<HomePage />} />
    <Route path="/event/:_id" element={<EventPage /> } />
    <Route path="/event/:_id/direction" element={<LocationPage /> } />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>    
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);

