import React, { useEffect } from 'react';
import HomeScreen from "./screens/HomeScreen"
import './App.css';
import { auth } from './firebase';
import LoginScreen from "./screens/LoginScreen";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import Account from './screens/Account';
// import Footer from './Footer';
// import SignupScreen from './SignupScreen';

function App() {

  const user = useSelector(selectUser)

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        // console.log(userAuth);
        //Logged in
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }))
      }
      else {
        //Logged out
        dispatch(logout())
      }
    });

    return () => {
      unsubscribe();
    }

  }, [dispatch])

  return (
    <div className="app">
      <Router>
        <div>
          {!user ? (
            <LoginScreen />
          ) : (

            <Routes>
              <Route path="/"
                element={<HomeScreen />}>
              </Route>
              <Route path='/profile' element={<Account />}>
              </Route>
              {/* <Route path="/signup" element={<SignupScreen/>}>
              </Route> */}
              {/* <Route path="/about" element={<div>
              <h1>TV Shows</h1>
            </div>} >
            </Route> */}
            </Routes>
          )}
        </div>
      </Router >
      {/* <Footer /> */}
    </div >
  );
}


export default App;
