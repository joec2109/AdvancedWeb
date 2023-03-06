import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from "./Header"
import Footer from "./Footer"
import Home from "./pages/Home.js"
import SignUp from  "./pages/SignUp.jsx"
import LogIn from "./pages/LogIn.jsx"

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);
  
  
  return (
    <>
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/logIn" element={<LogIn />} />
        </Routes>
        <p>{!data ? "Loading..." : data}</p>
      </main>
      <Footer />
    </div>
    </>
  );
}

export default App;