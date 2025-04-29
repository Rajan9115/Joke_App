import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import FavoritesPage from './FavoritesPage.jsx'; // ⬅️ New component you'll create


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/favorites" element={<FavoritesPage />} />
    </Routes>
  </BrowserRouter>
);

