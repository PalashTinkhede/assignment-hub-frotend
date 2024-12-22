// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import SpecificAssignment from './components/SpecificAssignment';
import Profile from './components/Profile';
import EnrolledAssignmentDetail from './components/EnrolledAssignmentDetail';
import About from './components/About';
import Contact from './components/Contact';

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/enroll/:id" element={<EnrolledAssignmentDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/assignment/:id" element={<SpecificAssignment />} />
      </Routes>
    </Router>
  );
};

export default App;