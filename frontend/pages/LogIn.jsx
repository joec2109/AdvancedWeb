import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import '../App.css';
import ParticlesBackground from '../components/ParticlesBackground';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// LogIn.jsx

function LogIn() {

  // Speech recognition stuff
  // User can set username & password to their own values using it
  const commands = [
    {
      command: ["Set * to *"],
      callback: (elementToEdit, valueToUse) => setActionPerform({ elementToEdit, valueToUse }),

    }
  ]

  const [actionPerform, setActionPerform] = useState('');

  const handleActionPerform = () => {
    if (actionPerform) {
      const { elementToEdit, valueToUse } = actionPerform;
      const element = document.getElementById(elementToEdit);
      // If user says "set username to" then set the username field to the value followed by 'to'.
      if (elementToEdit == 'username') {
        setUsername(valueToUse)
      }
      // If user says "set password to" then set the password field to the value followed by 'to'.
      if (elementToEdit == 'password') {
        setPassword(valueToUse)
      }
      // grab the username/password/repeat password elements from the website
      if (element) {
        element.value = valueToUse;
      }
    }
  };
  
  useEffect(() => {
    handleActionPerform();
  }, [actionPerform]);
  
  // Print the input of the user's voice
  const {transcript} = useSpeechRecognition({commands});

  // End of speech recognition stuff

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [loginStatus, setLoginStatus] = useState('')

  Axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  // Create the login function that attempts to login the user to the website
  const login = () => {
    Axios.post('http://localhost:3001/login', {username:username, password:password}).then((response) => {

      if (response.data.message) {
        setLoginStatus(response.data.message);

      } else {
        setLoginStatus(response.data[0].username);
        navigate("/");
        window.location.reload(false);
      }
    });
  };

  React.useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn==true) {
        setLoginStatus(response.data.user[0].username)
      }
    })
  }, [])
  // Output the elements for the login page
  return (<>
  <ParticlesBackground />
    <div className="form">
      <h1>Log In</h1>
      <div className="form-body">
        <div className="username">
          <label className="form__label" for="username">Username </label>
          <input className="form__input" type="text" id="username" placeholder="Username" onChange={(e)=> {setUsername(e.target.value)}}/>
        </div>
        <div className="password">
          <label className="form__label" for="password">Password </label>
          <input className="form__input" type="text" id="password" placeholder="Password" onChange={(e)=> {setPassword(e.target.value)}}/>
        </div>
      </div>
      <button type="submit" onClick = {login}>Log In</button>

      <p>{loginStatus}</p>

    </div>

    <div className='transcript-form'>
      <button onClick={SpeechRecognition.startListening}>Use Microphone</button>
      <p id="transcript" className='transcriptCss'>Transcript: {transcript}</p>
    </div>
    </>
  )
}

export default LogIn