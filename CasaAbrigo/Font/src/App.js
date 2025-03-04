import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Pessoa from './components/Pessoa';
import Cozinha from './components/Cozinha';
import Quarto from './components/Quarto';
import Casa from './components/Casa';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/pessoa' element={<Pessoa />} />
          <Route path='/cozinha' element={<Cozinha />} />
          <Route path='/quarto' element={<Quarto />} />
          <Route path='/casa' element={<Casa />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
