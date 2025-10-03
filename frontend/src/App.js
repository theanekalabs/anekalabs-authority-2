import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AssessmentProvider } from './context/AssessmentContext';
import Homepage from './pages/Homepage';
import AuthorityStep from './pages/AuthorityStep';
import ContentStrategy from './pages/ContentStrategy';
import Results from './pages/Results';
import './App.css';

function App() {
  return (
    <AssessmentProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/authority/:dimension" element={<AuthorityStep />} />
            <Route path="/content-strategy" element={<ContentStrategy />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AssessmentProvider>
  );
}

export default App;