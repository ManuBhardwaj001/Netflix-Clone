import React from 'react';
import HomeScreen from "./screens/Homescreen"
import './App.css';
import LoginScreen from "./screens/LoginScreen"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  const user = null

  return (
    <div className="app">
      {/* <HomeScreen /> */}
      <Router>
        <div>
          {!user ? (
            <LoginScreen/>
          ) :(

          <Routes>
            <Route path="/" 
            element={<HomeScreen />}>
            </Route>
            {/* <Route path="/about" element={<div>
              <h1>TV Shows</h1>
            </div>} >
            </Route> */}
          </Routes>
          )}
        </div>
      </Router >
    </div >
  );
}


export default App;
