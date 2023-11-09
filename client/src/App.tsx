import React, { useState } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';


function App() {

  return (
    <div className="App">
        <Outlet />   
     {/* <footer className='footer'>
          <p>Kontakt <br /> Adresse <br /> DatenSchutz </p>
      </footer>  */}
    </div>
  );
}

export default App;