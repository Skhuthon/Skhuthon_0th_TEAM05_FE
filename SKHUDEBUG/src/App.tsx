import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Ranking from './pages/RankingPage';
import { users as initialUsers } from './utlis/users';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ranking" element={<Ranking initialUsers={initialUsers} />} />
      </Routes>
    </Router>
  );
};

export default App;
