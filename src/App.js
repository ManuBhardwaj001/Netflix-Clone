import React, { useEffect } from 'react';
import HomeScreen from "./screens/Homescreen"
import './App.css';
import { auth } from './firebase';
import LoginScreen from "./screens/LoginScreen"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  const user = null

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        console.log(userAuth);
        //Logged in
      }
      else {
        //Logged out
      }
    });

    return () => {
      unsubscribe();
    }

  }, [])

  return (
    <div className="app">
      {/* <HomeScreen /> */}
      <Router>
        <div>
          {!user ? (
            <LoginScreen />
          ) : (

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
