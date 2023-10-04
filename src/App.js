import React from 'react';
import HomeScreen from "../src/Homescreen"
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="app">
      {/* <HomeScreen /> */}
      <Router>
        <div>
          <Routes>
            <Route path="/about" element={<div>
              <h1>TV Shows</h1>
            </div>} >
            </Route>
            <Route path="/" element={<HomeScreen />}>
            </Route>
          </Routes>
        </div>
      </Router >
    </div >
  );
}


export default App;
