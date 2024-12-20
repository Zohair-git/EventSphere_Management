import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminHome from './Pages/Admin/Home';
import AllUsers from './Pages/Admin/AllUsers';
import AddEvent from './Pages/Admin/AddEvent';
import AllEvent from './Pages/Admin/AllEvent';
import ExibiterHome from './Pages/Exhibitor/Home'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/users" element={<AllUsers />} />
        <Route path="/admin/addevent" element={<AddEvent />} />
        <Route path="/admin/allevent" element={<AllEvent />} />

        {/* Exhibiter Routes */}
        <Route path="/exibiter" element={<ExibiterHome />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;