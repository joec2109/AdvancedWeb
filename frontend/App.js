// Import the required dependencies & page elements
import React, {useState, ReactDOM} from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Axios from 'axios';
import './App.css';
import Header from "./Header"
import Footer from "./Footer"
import Home from "./pages/Home.js"
import SignUp from  "./pages/SignUp.jsx"
import LogIn from "./pages/LogIn.jsx"
import LogOut from "./pages/LogOut.jsx"
import Profile from "./pages/Profile.jsx"
import NewsFeed from "./pages/NewsFeed.jsx"
import SelectTeam from "./SelectTeam.jsx"

function App() {


  // Define the variables used to store whether the user is logged in or not.
  const [loginStatus, setLoginStatus] = useState('');

  // If the user has logged in, set the login status to their username.
  React.useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn==true) {
        setLoginStatus(response.data.user[0].username)
        console.log(response);
      }
    })
  }, [])

  // define the logout function
  const handleLogout = () => {
    Axios.post('http://localhost:3001/logout', { withCredentials: true })
      .then((response) => {
        console.log(response);
        setLoginStatus('');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // If not logged in, then show the default navigation bar with sign up and log in.
  if (!loginStatus) {
    return (
      <>
      <div className="App">
        <Header />
        <main>
          <div id="root"></div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/logIn" element={<LogIn />} />
            <Route path="/logOut" element={<LogOut onLogout={handleLogout} />} /> // add the logout route
            <Route path="/profile" element={<Profile />} />
            <Route path="/selectTeam" element={<SelectTeam />} />
            <Route path="/newsFeed" element={<NewsFeed />} />
          </Routes>
        </main>
        <Footer />
      </div>
      </>
    );
  }
  // Otherwise, display a navigation bar with log out and news feed buttons.
  return (
    <>
    <div className="App">
      <Header />
      <main>
        <div id="root"></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/logOut" element={<LogOut onLogout={handleLogout} />} /> // add the logout route
          <Route path="/profile" element={<Profile />} />
          <Route path="/selectTeam" element={<SelectTeam />} />
          <Route path="/newsFeed" element={<NewsFeed />} />
        </Routes>
      </main>
      <Footer />
    </div>
    </>
  );
}

export default App;