import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminHome from './Pages/Admin/Home';
import AllUsers from './Pages/Admin/AllUsers';
import AddEvent from './Pages/Admin/AddEvent';
import AllEvent from './Pages/Admin/AllEvent';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/users" element={<AllUsers />} />
        <Route path="/addevent" element={<AddEvent />} />
        <Route path="/allevent" element={<AllEvent />} />



      </Routes>
    </BrowserRouter>
  );
};

export default App;
