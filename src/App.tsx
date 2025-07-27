import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameStoreProvider } from './context/GameStoreContext';
import Entrance from './pages/Entrance';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Products from './pages/Products';
import Search from './pages/Search';
import Order from './pages/Order';
import Links from './pages/Links';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Layout from './components/Layout';

function App() {
  return (
    <GameStoreProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Entrance />} />
          <Route path="/home" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/products" element={<Layout><Products /></Layout>} />
          <Route path="/search" element={<Layout><Search /></Layout>} />
          <Route path="/order" element={<Layout><Order /></Layout>} />
          <Route path="/links" element={<Layout><Links /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="/admin" element={<Layout><Admin /></Layout>} />
        </Routes>
      </Router>
    </GameStoreProvider>
  );
}

export default App;