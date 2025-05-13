import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<HomePage />} />


                    
                </Routes>
            </div>
        </Router>
    );
}

export default App;