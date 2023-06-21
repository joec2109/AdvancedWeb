import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import '../App.css';
import ParticlesBackground from '../components/ParticlesBackground';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// SignUp.js
export default function SignUp() {

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
        setUsernameReg(valueToUse)
      }
      // If user says "set password to" then set the password & repeat password fields to the value followed by 'to'.
      if (elementToEdit == 'password') {
        document.getElementById('passwordRepeat').value = valueToUse
        setPasswordReg(valueToUse)
        setPasswordRepeatReg(valueToUse)
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

  const [usernameReg, setUsernameReg] = useState('')
  const [passwordReg, setPasswordReg] = useState('')
  const [passwordRepeatReg, setPasswordRepeatReg] = useState('')

  const [regStatus, setRegStatus] = useState('')

  // Create the register function that attempts to register the user to the database
  const register = () => {
    Axios.post('http://localhost:3001/register', {username:usernameReg, password:passwordReg, passwordRepeat:passwordRepeatReg}).then((response) => {

    if (response.data.message) {
      setRegStatus(response.data.message);
    } else {
      setRegStatus(response.data.message);
    }

    });
  };

  // Output the elements for the login page
  return (<>
  <ParticlesBackground />
  <div className="form">
    <h1>Sign Up</h1>
    <div className="form-body">
      <div className="username">
        <label className="form__label" for="username">Username </label>
        <input className="form__input" type="text" id="username" placeholder="Username" onChange={(e)=> {setUsernameReg(e.target.value)}}/>
      </div>
      <div className="password">
        <label className="form__label" for="password">Password </label>
        <input className="form__input" type="text" id="password" placeholder="Password" onChange={(e)=> {setPasswordReg(e.target.value)}}/>
      </div>
      <div className="passwordRepeat">
        <label className="form__label" for="passwordRepeat">Repeat Password </label>
        <input className="form__input" type="text" id="passwordRepeat" placeholder="Repeat Password" onChange={(e)=> {setPasswordRepeatReg(e.target.value)}}/>
      </div>
    </div>
    <button type="submit" class="btn" onClick={register}>Sign Up</button>

    <p>{regStatus}</p>

  </div>
  <div className='transcript-form'>
      <button onClick={SpeechRecognition.startListening}>Use Microphone</button>
      <p id="transcript" className='transcriptCss'>Transcript: {transcript}</p>
    </div>
  </>
  )
}